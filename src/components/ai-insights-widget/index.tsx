"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Brain,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Zap,
  RefreshCw,
  Target,
  DollarSign
} from "lucide-react";

interface AIInsight {
  title: string;
  detail: string;
  severity: "low" | "medium" | "high";
  category: string;
  actionable: boolean;
  confidence: number;
}

export default function AIInsightsWidget() {
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string>("");

  const fetchInsights = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/agent/insights');
      if (response.ok) {
        const data = await response.json();
        setInsights(data.insights.slice(0, 3)); // Show top 3 insights
        setLastUpdated(new Date().toLocaleTimeString());
      }
    } catch (error) {
      console.error('Failed to fetch AI insights:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInsights();
  }, []);

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "high":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case "medium":
        return <TrendingUp className="h-4 w-4 text-yellow-500" />;
      case "low":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <Brain className="h-4 w-4 text-blue-500" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-800";
      case "medium":
        return "bg-yellow-50 border-yellow-200 dark:bg-yellow-950/20 dark:border-yellow-800";
      case "low":
        return "bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-800";
      default:
        return "bg-blue-50 border-blue-200 dark:bg-blue-950/20 dark:border-blue-800";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "sales":
        return <Target className="h-4 w-4 text-blue-600" />;
      case "finance":
        return <DollarSign className="h-4 w-4 text-green-600" />;
      case "operations":
        return <Zap className="h-4 w-4 text-orange-600" />;
      default:
        return <Brain className="h-4 w-4 text-purple-600" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            AI Insights
          </CardTitle>
          <div className="flex items-center gap-2">
            {lastUpdated && (
              <span className="text-xs text-muted-foreground">
                Updated: {lastUpdated}
              </span>
            )}
            <Button
              size="sm"
              variant="outline"
              onClick={fetchInsights}
              disabled={isLoading}
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" />
            <span className="ml-2 text-sm text-muted-foreground">Analyzing data...</span>
          </div>
        ) : insights.length > 0 ? (
          <div className="space-y-4">
            {insights.map((insight, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border ${getSeverityColor(insight.severity)}`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    {getSeverityIcon(insight.severity)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {getCategoryIcon(insight.category)}
                      <h4 className="font-medium text-sm">{insight.title}</h4>
                      <Badge
                        variant="outline"
                        className="text-xs"
                      >
                        {insight.confidence}% confidence
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {insight.detail}
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="text-xs">
                        {insight.category}
                      </Badge>
                      {insight.actionable && (
                        <Button size="sm" variant="outline" className="text-xs">
                          Take Action
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {insights.length >= 3 && (
              <div className="text-center pt-2">
                <Button variant="ghost" size="sm" className="text-sm">
                  View All Insights →
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8">
            <Brain className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No AI Insights Yet</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Add project data, leads, and client information to receive AI-powered recommendations
            </p>
            <Button onClick={fetchInsights} disabled={isLoading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Generate Insights
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
