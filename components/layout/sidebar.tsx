"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { menuItems } from "@/constants/menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSession } from "next-auth/react";

export function Sidebar({ className }: { className?: string }) {
    const pathname = usePathname();
    const { data: session } = useSession();
    const userRole = session?.user?.role || "SISWA"; // Default to SISWA if not logged in

    const filteredMenu = menuItems.filter((item) => {
        // If no roles defined, everyone sees it
        if (!item.roles || item.roles.length === 0) return true;
        // Check if user's role is in the allowed roles
        return item.roles.includes(userRole as string);
    });

    return (
        <div className={cn("pb-12 w-64 border-r bg-background h-screen sticky top-0 hidden md:block", className)}>
            <div className="space-y-4 py-4">
                <div className="px-3 py-2">
                    <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight text-primary">
                        Bimbel Integrated
                    </h2>
                    <div className="space-y-1">
                        <ScrollArea className="h-[calc(100vh-100px)]">
                            {filteredMenu.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        buttonVariants({ variant: "ghost", size: "sm" }),
                                        "w-full justify-start gap-2",
                                        pathname.startsWith(item.href)
                                            ? "bg-secondary text-secondary-foreground"
                                            : "text-muted-foreground"
                                    )}
                                >
                                    <item.icon className="h-4 w-4" />
                                    {item.title}
                                </Link>
                            ))}
                        </ScrollArea>
                    </div>
                </div>
            </div>
        </div>
    );
}
