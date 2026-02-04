"use client";

import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { menuItems } from "@/constants/menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { useSession } from "next-auth/react";

export function MobileSidebar() {
    const pathname = usePathname();
    const { data: session } = useSession();
    const userRole = session?.user?.role || "SISWA";

    const filteredMenu = menuItems.filter((item) => {
        if (!item.roles || item.roles.length === 0) return true;
        return item.roles.includes(userRole as string);
    });

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle Menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] sm:w-[300px]">
                <SheetTitle className="text-lg font-bold mb-4">Menu Navigasi</SheetTitle>
                <div className="flex flex-col space-y-2 mt-4">
                    {filteredMenu.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                buttonVariants({ variant: "ghost", size: "sm" }),
                                "justify-start gap-2",
                                pathname.startsWith(item.href)
                                    ? "bg-secondary text-secondary-foreground"
                                    : "text-muted-foreground"
                            )}
                        >
                            <item.icon className="h-4 w-4" />
                            {item.title}
                        </Link>
                    ))}
                </div>
            </SheetContent>
        </Sheet>
    );
}
