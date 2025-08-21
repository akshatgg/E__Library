"use client";

import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import {BookOpen, User, Moon, Sun, LogOut} from "lucide-react";
import {useAuth} from "@/components/auth-provider";
import {useTheme} from "next-themes";
import {useEffect} from "react";

export default function Navbar() {
  const {user, logout, token} = useAuth();
  const {theme, setTheme} = useTheme();
  const router = useRouter();

  useEffect(() => {
    if (!user && !token) return router.push("/auth/signin");
  }, [user, token]);

  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 ">
      {user && token && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div
              className="flex items-center space-x-3 cursor-pointer group"
              onClick={() => router.push("/")}
            >
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  E-Library
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  by iTax Easy
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Badge
                variant="secondary"
                className="hidden sm:flex items-center group cursor-pointer"
                onClick={() => router.push("/dashboard")}
              >
                <User className="w-3 h-3 mr-1" />
                {user?.displayName || "User"}
              </Badge>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme === "dark" ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={logout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
