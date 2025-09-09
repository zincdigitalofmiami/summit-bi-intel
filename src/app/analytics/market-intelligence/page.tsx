"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	AlertTriangle,
	Building2,
	Calendar,
	CheckCircle2,
	Clock,
	DollarSign,
	ExternalLink,
	FileText,
	MapPin,
	Phone,
	RefreshCw,
	Shield,
	TrendingDown,
	TrendingUp,
	User,
	Users,
	XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { competitors, type Competitor } from "@/data/competitors";

// Types from your existing implementation
interface MarinePermit {
	source: string;
	jurisdiction: string;
	permit_id: string;
	project_type: string;
	description: string;
	address: string;
	applicant: string;
	status: string;
	issue_date: string;
	expiration_date?: string;
	contractor_license?: string;
	parcel_number?: string;
	lat?: number;
	lng?: number;
	estimated_cost?: number;
	inspections?: Array<{
		type: string;
		status: string;
		date: string;
	}>;
	documents?: Array<{
		type: string;
		url: string;
	}>;
	last_updated: string;
}

interface PermitResponse {
	success: boolean;
	count: number;
	total_found: number;
	permits: MarinePermit[];
	last_updated: string;
}

interface CompetitorActivity {
	id: string;
	name: string;
	type: "permit" | "project" | "news";
	description: string;
	date: string;
	value?: number;
	status: string;
	location: string;
}

interface MarketTrend {
	id: string;
	name: string;
	value: number;
	change: number;
	period: string;
	trend: "up" | "down" | "neutral";
}

interface MarketOpportunity {
	id: string;
	title: string;
	description: string;
	value: number;
	probability: number;
	deadline?: string;
	status: "hot" | "warm" | "cold";
	type: string;
}

export default function MarketIntelligencePage() {
	const [activeTab, setActiveTab] = useState("overview");
	const [permits, setPermits] = useState<MarinePermit[]>([]);
	const [loading, setLoading] = useState(false);
	const [lastUpdated, setLastUpdated] = useState<string>("");
	const [error, setError] = useState<string>("");

	const getLicenseStatusColor = (status: string) => {
		switch (status) {
			case "active":
				return "bg-green-500 text-white";
			case "inactive":
				return "bg-red-500 text-white";
			default:
				return "bg-yellow-500 text-white";
		}
	};

	const marketTrends: MarketTrend[] = [
		{
			id: "1",
			name: "Average Project Value",
			value: 175000,
			change: 12.5,
			period: "Last 30 days",
			trend: "up",
		},
		{
			id: "2",
			name: "Seawall Permits",
			value: 15,
			change: -5,
			period: "Last 30 days",
			trend: "down",
		},
		{
			id: "3",
			name: "Material Costs",
			value: 85000,
			change: 8.2,
			period: "Last 30 days",
			trend: "up",
		},
	];

	const opportunities: MarketOpportunity[] = [
		{
			id: "1",
			title: "Large Marina Renovation",
			description:
				"Complete renovation of 50-slip marina including seawall repair",
			value: 750000,
			probability: 75,
			deadline: "2025-03-01",
			status: "hot",
			type: "Commercial",
		},
		{
			id: "2",
			title: "Residential Dock Program",
			description:
				"Multiple residential dock projects in new waterfront development",
			value: 450000,
			probability: 60,
			deadline: "2025-04-15",
			status: "warm",
			type: "Residential",
		},
	];

	const fetchPermits = async (source: string = "all") => {
		setLoading(true);
		setError("");

		try {
			// Use demo endpoint for testing - replace with /api/market/panama-permits for production
			const response = await fetch(
				`/api/market/panama-permits/demo?source=${source}&limit=100`,
			);
			const data: PermitResponse = await response.json();

			if (data.success) {
				setPermits(data.permits);
				setLastUpdated(data.last_updated);
			} else {
				setError("Failed to fetch permit data");
			}
		} catch (err) {
			setError("Network error while fetching permits");
			console.error("Fetch error:", err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchPermits();
	}, []);

	const getStatusColor = (status: string) => {
		switch (status.toLowerCase()) {
			case "approved":
			case "issued":
				return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
			case "pending":
			case "under review":
				return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
			case "denied":
			case "rejected":
				return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
			default:
				return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
		}
	};

	const getProjectTypeColor = (type: string) => {
		switch (type.toLowerCase()) {
			case "seawall":
				return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
			case "dock":
				return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
			case "piling":
				return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
			case "dredging":
				return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
			default:
				return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
		}
	};

	const formatDate = (dateString: string) => {
		try {
			return new Date(dateString).toLocaleDateString("en-US", {
				year: "numeric",
				month: "short",
				day: "numeric",
			});
		} catch {
			return dateString;
		}
	};

	const formatCurrency = (value: number) => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
			minimumFractionDigits: 0,
			maximumFractionDigits: 0,
		}).format(value);
	};

	return (
		<div className="container mx-auto space-y-6 p-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold">Market Intelligence</h1>
					<p className="text-muted-foreground">
						Comprehensive market analysis and insights
					</p>
				</div>
				<Button onClick={() => fetchPermits()} disabled={loading}>
					<RefreshCw
						className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`}
					/>
					Refresh Data
				</Button>
			</div>

			<Tabs
				value={activeTab}
				onValueChange={setActiveTab}
				className="space-y-4"
			>
				<TabsList>
					<TabsTrigger value="overview">Overview</TabsTrigger>
					<TabsTrigger value="permits">Permits</TabsTrigger>
					<TabsTrigger value="competitors">Competitors</TabsTrigger>
					<TabsTrigger value="trends">Trends</TabsTrigger>
					<TabsTrigger value="opportunities">Opportunities</TabsTrigger>
				</TabsList>

				{/* Overview Tab */}
				<TabsContent value="overview" className="space-y-4">
					<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
						<Card>
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-sm font-medium">
									Active Permits
								</CardTitle>
								<FileText className="h-4 w-4 text-muted-foreground" />
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">{permits.length}</div>
								<p className="text-xs text-muted-foreground">
									+2 from last month
								</p>
							</CardContent>
						</Card>
						<Card>
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-sm font-medium">
									Market Value
								</CardTitle>
								<DollarSign className="h-4 w-4 text-muted-foreground" />
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">$2.4M</div>
								<p className="text-xs text-muted-foreground">
									+15% from last quarter
								</p>
							</CardContent>
						</Card>
						<Card>
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-sm font-medium">
									Active Competitors
								</CardTitle>
								<Users className="h-4 w-4 text-muted-foreground" />
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">12</div>
								<p className="text-xs text-muted-foreground">
									2 new this month
								</p>
							</CardContent>
						</Card>
						<Card>
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-sm font-medium">
									Opportunities
								</CardTitle>
								<TrendingUp className="h-4 w-4 text-muted-foreground" />
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">8</div>
								<p className="text-xs text-muted-foreground">
									$1.2M potential value
								</p>
							</CardContent>
						</Card>
					</div>

					<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
						<Card className="col-span-4">
							<CardHeader>
								<CardTitle>Recent Market Activity</CardTitle>
								<CardDescription>
									Latest permits and competitor movements
								</CardDescription>
							</CardHeader>
							<CardContent>
								{permits.slice(0, 5).map((permit) => (
									<div
										key={`${permit.source}-${permit.permit_id}-${permit.description}`}
										className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
									>
										<span className="flex h-2 w-2 translate-y-1.5 rounded-full bg-sky-500" />
										<div className="space-y-1">
											<p className="text-sm font-medium">
												{permit.description}
											</p>
											<p className="text-sm text-muted-foreground">
												{permit.applicant} • {formatDate(permit.issue_date)}
											</p>
										</div>
									</div>
								))}
							</CardContent>
						</Card>
						<Card className="col-span-3">
							<CardHeader>
								<CardTitle>Market Trends</CardTitle>
								<CardDescription>Key indicators and changes</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									{marketTrends.map((trend) => (
										<div key={trend.id} className="flex items-center">
											{trend.trend === "up" ? (
												<TrendingUp className="mr-2 h-4 w-4 text-green-500" />
											) : (
												<TrendingDown className="mr-2 h-4 w-4 text-red-500" />
											)}
											<div className="flex-1 space-y-1">
												<p className="text-sm font-medium leading-none">
													{trend.name}
												</p>
												<p className="text-sm text-muted-foreground">
													{trend.period}
												</p>
											</div>
											<div className="text-right">
												<p className="text-sm font-medium">
													{typeof trend.value === "number"
														? trend.value.toLocaleString()
														: trend.value}
												</p>
												<p
													className={
														trend.change > 0
															? "text-sm text-green-500"
															: "text-sm text-red-500"
													}
												>
													{trend.change > 0 ? "+" : ""}
													{trend.change}%
												</p>
											</div>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					</div>
				</TabsContent>

				{/* Permits Tab */}
				<TabsContent value="permits" className="space-y-4">
					<div className="flex items-center justify-between">
						<div className="space-x-2">
							<Button
								variant="outline"
								size="sm"
								onClick={() => fetchPermits("baycounty")}
								disabled={loading}
							>
								Bay County
							</Button>
							<Button
								variant="outline"
								size="sm"
								onClick={() => fetchPermits("panamacity")}
								disabled={loading}
							>
								Panama City
							</Button>
							<Button
								variant="outline"
								size="sm"
								onClick={() => fetchPermits("pcb")}
								disabled={loading}
							>
								PCB
							</Button>
						</div>
						<p className="text-sm text-muted-foreground">
							Last updated: {formatDate(lastUpdated)}
						</p>
					</div>

					<Card>
						<CardHeader>
							<CardTitle>Marine Construction Permits</CardTitle>
							<CardDescription>
								Active and recent permits in the Panama City area
							</CardDescription>
						</CardHeader>
						<CardContent>
							{loading ? (
								<div className="flex items-center justify-center py-8">
									<RefreshCw className="mr-2 h-6 w-6 animate-spin" />
									Loading permits...
								</div>
							) : permits.length === 0 ? (
								<div className="py-8 text-center text-muted-foreground">
									No permits found
								</div>
							) : (
								<div className="space-y-4">
									{permits.map((permit) => (
										<div
											key={`${permit.source}-${permit.permit_id}-${permit.description}`}
											className="rounded-lg border p-4 transition-colors hover:bg-muted/50"
										>
											<div className="flex items-start justify-between">
												<div className="flex-1 space-y-2">
													<div className="flex items-center gap-2">
														<Badge
															className={getProjectTypeColor(
																permit.project_type,
															)}
														>
															{permit.project_type}
														</Badge>
														<Badge className={getStatusColor(permit.status)}>
															{permit.status}
														</Badge>
														<Badge variant="outline">
															{permit.jurisdiction}
														</Badge>
													</div>

													<h3 className="text-lg font-semibold">
														{permit.description}
													</h3>

													<div className="grid grid-cols-1 gap-4 text-sm text-muted-foreground md:grid-cols-2">
														<div className="flex items-center gap-2">
															<FileText className="h-4 w-4" />
															<span>Permit ID: {permit.permit_id}</span>
														</div>
														<div className="flex items-center gap-2">
															<MapPin className="h-4 w-4" />
															<span>{permit.address}</span>
														</div>
														<div className="flex items-center gap-2">
															<User className="h-4 w-4" />
															<span>{permit.applicant}</span>
														</div>
														<div className="flex items-center gap-2">
															<Calendar className="h-4 w-4" />
															<span>
																Issued: {formatDate(permit.issue_date)}
															</span>
														</div>
													</div>
												</div>

												{permit.documents && permit.documents.length > 0 && (
													<Button variant="outline" size="sm" asChild>
														<a
															href={permit.documents[0].url}
															target="_blank"
															rel="noopener noreferrer"
															className="flex items-center gap-2"
														>
															<ExternalLink className="h-4 w-4" />
															View Documents
														</a>
													</Button>
												)}
											</div>
										</div>
									))}
								</div>
							)}
						</CardContent>
					</Card>
				</TabsContent>

		{/* Competitors Tab */}
		<TabsContent value="competitors" className="space-y-4">
			<div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
				{competitors.map((competitor) => (
					<Card key={competitor.id}>
						<CardHeader>
							<div className="flex items-start justify-between">
								<div>
									<CardTitle className="text-lg">{competitor.name}</CardTitle>
									<CardDescription className="flex items-center gap-2 mt-1">
										<ExternalLink className="h-3 w-3" />
										{competitor.website}
									</CardDescription>
								</div>
								<Badge className={getLicenseStatusColor(competitor.licensing.status)}>
									<Shield className="h-3 w-3 mr-1" />
									{competitor.licensing.status}
								</Badge>
							</div>
						</CardHeader>
						<CardContent className="space-y-4">
							{/* Contact Info */}
							<div className="grid grid-cols-1 gap-2 text-sm">
								<div className="flex items-center gap-2">
									<Phone className="h-4 w-4 text-muted-foreground" />
									<span>{competitor.phone}</span>
								</div>
								<div className="flex items-center gap-2">
									<MapPin className="h-4 w-4 text-muted-foreground" />
									<span>{competitor.address}</span>
								</div>
							</div>

							{/* Services */}
							<div>
								<h4 className="font-medium mb-2">Services</h4>
								<div className="flex flex-wrap gap-1">
									{competitor.services.slice(0, 3).map((service, idx) => (
										<Badge key={idx} variant="outline" className="text-xs">
											{service}
										</Badge>
									))}
									{competitor.services.length > 3 && (
										<Badge variant="outline" className="text-xs">
											+{competitor.services.length - 3} more
										</Badge>
									)}
								</div>
							</div>

							{/* Licensing Details */}
							<div>
								<h4 className="font-medium mb-2">Licensing Status</h4>
								<p className="text-sm text-muted-foreground">
									{competitor.licensing.details}
								</p>
								<p className="text-xs text-muted-foreground mt-1">
									Last verified: {formatDate(competitor.licensing.lastVerified)}
								</p>
							</div>

							{/* Strengths & Risks */}
							<div className="grid grid-cols-2 gap-4">
								<div>
									<h5 className="text-sm font-medium text-green-400 mb-1">Strengths</h5>
									<ul className="text-xs text-muted-foreground space-y-1">
										{competitor.strengths.slice(0, 2).map((strength, idx) => (
											<li key={idx} className="flex items-start gap-1">
												<span className="text-summit-light-blue mt-1">•</span>
												{strength}
											</li>
										))}
									</ul>
								</div>
								<div>
									<h5 className="text-sm font-medium text-red-400 mb-1">Risks</h5>
									<ul className="text-xs text-muted-foreground space-y-1">
										{competitor.risks.slice(0, 2).map((risk, idx) => (
											<li key={idx} className="flex items-start gap-1">
												<span className="text-federal-orange mt-1">•</span>
												{risk}
											</li>
										))}
									</ul>
								</div>
							</div>

							{/* Action Buttons */}
							<div className="flex gap-2 pt-2">
								<Button variant="outline" size="sm" asChild>
									<a
										href={`https://${competitor.website}`}
										target="_blank"
										rel="noopener noreferrer"
									>
										<ExternalLink className="h-3 w-3 mr-1" />
										Visit Site
									</a>
								</Button>
								<Button variant="summit" size="sm">
									<Shield className="h-3 w-3 mr-1" />
									Verify License
								</Button>
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</TabsContent>

				{/* Trends Tab */}
				<TabsContent value="trends" className="space-y-4">
					<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
						{marketTrends.map((trend) => (
							<Card key={trend.id}>
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-sm font-medium">
										{trend.name}
									</CardTitle>
									{trend.trend === "up" ? (
										<TrendingUp className="h-4 w-4 text-green-500" />
									) : (
										<TrendingDown className="h-4 w-4 text-red-500" />
									)}
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold">
										{typeof trend.value === "number"
											? trend.value.toLocaleString()
											: trend.value}
									</div>
									<p
										className={
											trend.change > 0
												? "text-sm text-green-500"
												: "text-sm text-red-500"
										}
									>
										{trend.change > 0 ? "+" : ""}
										{trend.change}% from {trend.period}
									</p>
								</CardContent>
							</Card>
						))}
					</div>
				</TabsContent>

				{/* Opportunities Tab */}
				<TabsContent value="opportunities" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>Market Opportunities</CardTitle>
							<CardDescription>
								Potential projects and business opportunities
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								{opportunities.map((opportunity) => (
									<div
										key={opportunity.id}
										className="rounded-lg border p-4 transition-colors hover:bg-muted/50"
									>
										<div className="flex items-start justify-between">
											<div className="flex-1 space-y-2">
												<div className="flex items-center gap-2">
													<Badge
														className={
															opportunity.status === "hot"
																? "bg-red-100 text-red-800"
																: opportunity.status === "warm"
																	? "bg-yellow-100 text-yellow-800"
																	: "bg-blue-100 text-blue-800"
														}
													>
														{opportunity.status.toUpperCase()}
													</Badge>
													<Badge variant="outline">{opportunity.type}</Badge>
													{opportunity.deadline && (
														<Badge variant="outline" className="gap-1">
															<Clock className="h-3 w-3" />
															{formatDate(opportunity.deadline)}
														</Badge>
													)}
												</div>

												<h3 className="font-semibold">{opportunity.title}</h3>
												<p className="text-muted-foreground">
													{opportunity.description}
												</p>

												<div className="grid grid-cols-2 gap-4 text-sm">
													<div className="flex items-center gap-2">
														<DollarSign className="h-4 w-4" />
														<span>{formatCurrency(opportunity.value)}</span>
													</div>
													<div className="flex items-center gap-2">
														<CheckCircle2 className="h-4 w-4" />
														<span>{opportunity.probability}% probability</span>
													</div>
												</div>
											</div>
										</div>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
}
