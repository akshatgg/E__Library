"use client";

import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import {BookOpen, User, Moon, Sun, LogOut, LogIn} from "lucide-react";
import {useAuth} from "@/components/auth-provider";
import {useTheme} from "next-themes";

export default function Navbar() {
  const {user, logout} = useAuth();
  const {theme, setTheme} = useTheme();
  const router = useRouter();

  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo - always displayed */}
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

          {/* Actions based on authentication state */}
          <div className="flex items-center space-x-4">
            {/* Theme toggle - always visible */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Sun className="w-4 h-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute w-4 h-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>

            {user ? (
              /* Logged-in user actions */
              <>
                <Badge
                  variant="secondary"
                  className="hidden sm:flex items-center group cursor-pointer"
                  onClick={() => router.push("/profile")}
                >
                  <User className="w-3 h-3 mr-1" />
                  {user.displayName || "User"}
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => user.id && logout(user.id)}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </>
            ) : (
              /* Guest actions */
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push("/auth/signin")}
              >
                <LogIn className="w-4 h-4 mr-2" />
                Sign In
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
