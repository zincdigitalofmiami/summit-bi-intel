"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
	Bell,
	Building2,
	ChevronDown,
	FileText,
	LogOut,
	Mail,
	Plus,
	Search,
	Settings,
	User,
	Users as UsersIcon,
	Shield,
} from "lucide-react";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Input } from "../../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { ThemeToggle } from "../../theme-toggle";

interface User {
	email: string;
	role: 'ADMIN' | 'USER';
	name?: string;
}

export default function Header({ title }: { title: string }) {
	const [searchQuery, setSearchQuery] = useState("");
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	// Decode JWT token to get user information
	useEffect(() => {
		async function getUserInfo() {
			try {
				const response = await fetch('/api/auth/me');
				if (response.ok) {
					const userData = await response.json();
					setUser(userData);
				}
			} catch (error) {
				console.warn('Failed to get user info:', error);
			} finally {
				setLoading(false);
			}
		}
		getUserInfo();
	}, []);

	const notifications = [
		{
			id: 1,
			title: "New Lead",
			description: "Commercial dock project inquiry from Gulf Coast Marina",
			time: "5m ago",
			unread: true,
		},
		{
			id: 2,
			title: "Permit Update",
			description: "Bay County seawall permit BC-2025-001234 approved",
			time: "1h ago",
			unread: true,
		},
		{
			id: 3,
			title: "Market Alert",
			description: "New competitor project in Panama City Beach area",
			time: "2h ago",
			unread: false,
		},
	];

	const quickActions = [
		{
			icon: Plus,
			label: "New Lead",
			href: "/leads/new",
			description: "Create a new sales lead",
		},
		{
			icon: FileText,
			label: "New Proposal",
			href: "/proposals/new",
			description: "Generate a new proposal",
		},
		{
			icon: UsersIcon,
			label: "Add Client",
			href: "/clients/new",
			description: "Add a new client",
		},
		{
			icon: Building2,
			label: "New Project",
			href: "/projects/new",
			description: "Start a new project",
		},
	];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card">
      <div className="flex h-16 items-center px-4 md:px-6">
				<div className="flex flex-1 items-center gap-4">
					{/* Page Title */}
					<h1 className="text-xl font-semibold md:text-2xl">{title}</h1>

					{/* Global Search */}
					<div className="ml-auto hidden flex-1 md:flex md:max-w-sm lg:max-w-lg">
						<div className="relative w-full">
							<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
							<Input
								type="search"
								placeholder="Search leads, projects, clients..."
								className="w-full bg-muted pl-8 md:w-2/3 lg:w-full"
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
							/>
						</div>
					</div>
				</div>

				{/* Right Side Actions */}
				<div className="flex items-center gap-4">
					{/* Quick Actions */}
					<Popover>
						<PopoverTrigger asChild>
							<Button variant="outline" size="sm" className="hidden md:flex">
								<Plus className="mr-2 h-4 w-4" />
								Quick Actions
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-80 p-0" align="end">
							<div className="grid gap-1 p-2">
								{quickActions.map((action) => (
									<Link
										key={action.label}
										href={action.href}
										className="flex items-center gap-2 rounded-md p-2 hover:bg-muted"
									>
										<action.icon className="h-4 w-4" />
										<div className="flex-1">
											<p className="font-medium">{action.label}</p>
											<p className="text-sm text-muted-foreground">
												{action.description}
											</p>
										</div>
									</Link>
								))}
							</div>
						</PopoverContent>
					</Popover>

					{/* Notifications */}
					<Popover>
						<PopoverTrigger asChild>
							<Button variant="ghost" size="icon" className="relative">
								<Bell className="h-5 w-5" />
								<span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
									2
								</span>
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-80 p-0" align="end">
							<div className="flex items-center justify-between border-b p-3">
								<h2 className="font-semibold">Notifications</h2>
								<Button variant="ghost" size="sm">
									Mark all read
								</Button>
							</div>
							<div className="grid gap-1 p-1">
								{notifications.map((notification) => (
									<div
										key={notification.id}
										className="flex gap-3 rounded-md p-2 hover:bg-muted"
									>
										<div className="flex-1">
											<div className="flex items-center gap-2">
												<p className="font-medium">{notification.title}</p>
												{notification.unread && (
													<Badge
														variant="secondary"
														className="h-1.5 w-1.5 rounded-full bg-blue-500 p-0"
													/>
												)}
											</div>
											<p className="text-sm text-muted-foreground">
												{notification.description}
											</p>
											<p className="mt-1 text-xs text-muted-foreground">
												{notification.time}
											</p>
										</div>
									</div>
								))}
							</div>
							<div className="border-t p-2">
								<Button
									variant="ghost"
									className="w-full justify-center"
									asChild
								>
									<Link href="/notifications">View all notifications</Link>
								</Button>
							</div>
						</PopoverContent>
					</Popover>

					<ThemeToggle />

					{/* User Menu */}
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant="ghost"
								className="flex items-center gap-2"
								size="sm"
								disabled={loading}
							>
								<div className="flex items-center gap-2">
									<div className="relative h-8 w-8">
										{user?.role === 'ADMIN' ? (
											<div className="flex h-full w-full items-center justify-center rounded-full bg-blue-500">
												<Shield className="h-4 w-4 text-white" />
											</div>
										) : (
											<div className="flex h-full w-full items-center justify-center rounded-full bg-gray-400">
												<User className="h-4 w-4 text-white" />
											</div>
										)}
									</div>
									<div className="hidden text-left md:block">
										<p className="text-sm font-medium">
											{loading ? "Loading..." : (user?.name || user?.email?.split('@')[0] || "User")}
										</p>
										<p className="text-xs text-muted-foreground flex items-center gap-1">
											{user?.role === 'ADMIN' && <Shield className="h-3 w-3" />}
											{user?.role === 'ADMIN' ? 'Administrator' : 'User'}
										</p>
									</div>
								</div>
								<ChevronDown className="h-4 w-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end" className="w-56">
							<DropdownMenuLabel>
								<div className="flex flex-col">
									<span>My Account</span>
									<span className="text-xs font-normal text-muted-foreground">
										{user?.email}
									</span>
								</div>
							</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem asChild>
								<Link href="/account">
									<User className="mr-2 h-4 w-4" />
									Profile
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<Mail className="mr-2 h-4 w-4" />
								Messages
							</DropdownMenuItem>
							<DropdownMenuItem asChild>
								<Link href="/account/security">
									<Settings className="mr-2 h-4 w-4" />
									Security
								</Link>
							</DropdownMenuItem>
							{user?.role === 'ADMIN' && (
								<>
									<DropdownMenuSeparator />
									<DropdownMenuItem asChild>
										<Link href="/admin">
											<Shield className="mr-2 h-4 w-4" />
											Admin Panel
										</Link>
									</DropdownMenuItem>
								</>
							)}
							<DropdownMenuSeparator />
							<DropdownMenuItem className="text-red-500" asChild>
								<form action="/api/auth/logout" method="post">
									<button type="submit" className="flex w-full items-center">
										<LogOut className="mr-2 h-4 w-4" />
										Log out
									</button>
								</form>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</header>
	);
}
