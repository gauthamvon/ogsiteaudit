"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Globe,
  Zap,
  Search,
  Shield,
  Smartphone,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  Eye,
  FileText,
  LinkIcon,
  ImageIcon,
  Settings,
  TrendingUp,
  ExternalLink,
  AlertCircle,
} from "lucide-react"

interface AuditResult {
  url: string
  overallScore: number
  pageSpeed: {
    score: number
    loadTime: number
    firstContentfulPaint: number
    largestContentfulPaint: number
    cumulativeLayoutShift: number
    pageSize: number
    requests: number
  }
  onPageSeo: {
    score: number
    titleTag: { present: boolean; length: number; optimized: boolean }
    metaDescription: { present: boolean; length: number; optimized: boolean }
    headings: { h1Count: number; h2Count: number; structure: boolean }
    images: { total: number; withAlt: number; optimized: number }
    internalLinks: number
    externalLinks: number
    keywords: { density: number; optimized: boolean }
  }
  technicalSeo: {
    score: number
    ssl: boolean
    mobile: boolean
    compression: boolean
    caching: boolean
    sitemap: boolean
    robotsTxt: boolean
    canonicalTags: boolean
    schemaMarkup: boolean
    pageSpeed: boolean
  }
  brokenLinks: {
    score: number
    total: number
    broken: number
    redirects: number
    links: Array<{ url: string; status: number; type: "broken" | "redirect" }>
  }
  recommendations: Array<{
    category: "Page Speed" | "On-Page SEO" | "Technical SEO" | "Broken Links"
    issue: string
    impact: "high" | "medium" | "low"
    solution: string
    priority: number
  }>
}

export default function OGSiteAudit() {
  const [url, setUrl] = useState("")
  const [isAuditing, setIsAuditing] = useState(false)
  const [auditResult, setAuditResult] = useState<AuditResult | null>(null)
  const [error, setError] = useState("")

  const handleAudit = async () => {
    if (!url) {
      setError("Please enter a valid URL")
      return
    }

    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      setError("Please enter a valid URL starting with http:// or https://")
      return
    }

    setError("")
    setIsAuditing(true)
    setAuditResult(null)

    // Simulate comprehensive audit process
    setTimeout(() => {
      const brokenLinksData = [
        { url: "/old-page", status: 404, type: "broken" as const },
        { url: "/redirect-page", status: 301, type: "redirect" as const },
        { url: "/another-broken", status: 500, type: "broken" as const },
      ]

      const mockResult: AuditResult = {
        url: url,
        overallScore: Math.floor(Math.random() * 30) + 70,
        pageSpeed: {
          score: Math.floor(Math.random() * 40) + 60,
          loadTime: Math.random() * 3 + 1,
          firstContentfulPaint: Math.random() * 2 + 0.5,
          largestContentfulPaint: Math.random() * 3 + 1.5,
          cumulativeLayoutShift: Math.random() * 0.2,
          pageSize: Math.floor(Math.random() * 2000) + 500,
          requests: Math.floor(Math.random() * 50) + 20,
        },
        onPageSeo: {
          score: Math.floor(Math.random() * 30) + 70,
          titleTag: {
            present: Math.random() > 0.1,
            length: Math.floor(Math.random() * 40) + 30,
            optimized: Math.random() > 0.3,
          },
          metaDescription: {
            present: Math.random() > 0.2,
            length: Math.floor(Math.random() * 80) + 120,
            optimized: Math.random() > 0.4,
          },
          headings: {
            h1Count: Math.floor(Math.random() * 3) + 1,
            h2Count: Math.floor(Math.random() * 8) + 2,
            structure: Math.random() > 0.3,
          },
          images: {
            total: Math.floor(Math.random() * 20) + 5,
            withAlt: Math.floor(Math.random() * 15) + 3,
            optimized: Math.floor(Math.random() * 10) + 2,
          },
          internalLinks: Math.floor(Math.random() * 30) + 10,
          externalLinks: Math.floor(Math.random() * 15) + 5,
          keywords: {
            density: Math.random() * 3 + 1,
            optimized: Math.random() > 0.4,
          },
        },
        technicalSeo: {
          score: Math.floor(Math.random() * 25) + 75,
          ssl: Math.random() > 0.1,
          mobile: Math.random() > 0.2,
          compression: Math.random() > 0.3,
          caching: Math.random() > 0.4,
          sitemap: Math.random() > 0.2,
          robotsTxt: Math.random() > 0.3,
          canonicalTags: Math.random() > 0.4,
          schemaMarkup: Math.random() > 0.6,
          pageSpeed: Math.random() > 0.3,
        },
        brokenLinks: {
          score: Math.floor(Math.random() * 40) + 60,
          total: Math.floor(Math.random() * 50) + 20,
          broken: brokenLinksData.filter((link) => link.type === "broken").length,
          redirects: brokenLinksData.filter((link) => link.type === "redirect").length,
          links: brokenLinksData,
        },
        recommendations: [
          {
            category: "Page Speed",
            issue: "Large image files are slowing down page load",
            impact: "high",
            solution:
              "Compress images and use modern formats like WebP. Consider lazy loading for images below the fold.",
            priority: 1,
          },
          {
            category: "On-Page SEO",
            issue: "Meta description is missing or too short",
            impact: "medium",
            solution:
              "Add compelling meta descriptions between 150-160 characters to improve click-through rates from search results.",
            priority: 2,
          },
          {
            category: "Technical SEO",
            issue: "Missing XML sitemap",
            impact: "medium",
            solution:
              "Create and submit an XML sitemap to help search engines discover and index your pages more efficiently.",
            priority: 3,
          },
          {
            category: "Broken Links",
            issue: "Multiple broken internal links detected",
            impact: "high",
            solution: "Fix or redirect broken links to improve user experience and prevent SEO penalties.",
            priority: 1,
          },
          {
            category: "Page Speed",
            issue: "Render-blocking CSS and JavaScript",
            impact: "high",
            solution:
              "Minimize render-blocking resources by inlining critical CSS and deferring non-critical JavaScript.",
            priority: 1,
          },
          {
            category: "On-Page SEO",
            issue: "Images missing alt text",
            impact: "medium",
            solution: "Add descriptive alt text to all images for better accessibility and SEO.",
            priority: 2,
          },
          {
            category: "Technical SEO",
            issue: "No structured data markup found",
            impact: "low",
            solution:
              "Implement schema markup to help search engines understand your content better and enable rich snippets.",
            priority: 4,
          },
        ].sort((a, b) => a.priority - b.priority),
      }
      setAuditResult(mockResult)
      setIsAuditing(false)
    }, 4000)
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600"
    if (score >= 70) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreBadgeVariant = (score: number) => {
    if (score >= 90) return "default"
    if (score >= 70) return "secondary"
    return "destructive"
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "text-red-600"
      case "medium":
        return "text-yellow-600"
      case "low":
        return "text-green-600"
      default:
        return "text-gray-600"
    }
  }

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case "high":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      case "medium":
        return <AlertCircle className="h-4 w-4 text-yellow-600" />
      case "low":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-600" />
    }
  }

  if (isAuditing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <Globe className="w-8 h-8 text-blue-600 animate-pulse" />
            </div>
            <CardTitle>Auditing Your Website</CardTitle>
            <CardDescription>Comprehensive analysis of {url}...</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Page Speed Analysis</span>
                <span>100%</span>
              </div>
              <Progress value={100} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>On-Page SEO Analysis</span>
                <span>85%</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Technical SEO Analysis</span>
                <span>70%</span>
              </div>
              <Progress value={70} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Broken Links Detection</span>
                <span>45%</span>
              </div>
              <Progress value={45} className="h-2" />
            </div>
            <p className="text-sm text-muted-foreground text-center">
              This comprehensive audit may take a few moments...
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (auditResult) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold">Website Audit Report</h1>
                <p className="text-muted-foreground">{auditResult.url}</p>
              </div>
              <Button
                variant="outline"
                onClick={() => {
                  setAuditResult(null)
                  setUrl("")
                }}
              >
                New Audit
              </Button>
            </div>

            {/* Overall Score */}
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className={`text-4xl font-bold ${getScoreColor(auditResult.overallScore)}`}>
                  {auditResult.overallScore}
                </div>
                <div className="text-sm text-muted-foreground">Overall Score</div>
              </div>
              <div className="flex-1">
                <Progress value={auditResult.overallScore} className="h-3" />
              </div>
              <Badge variant={getScoreBadgeVariant(auditResult.overallScore)}>
                {auditResult.overallScore >= 90
                  ? "Excellent"
                  : auditResult.overallScore >= 70
                    ? "Good"
                    : "Needs Improvement"}
              </Badge>
            </div>
          </div>

          {/* Score Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Page Speed</CardTitle>
                <Zap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${getScoreColor(auditResult.pageSpeed.score)}`}>
                  {auditResult.pageSpeed.score}
                </div>
                <div className="space-y-1 mt-2 text-sm text-muted-foreground">
                  <div>Load Time: {auditResult.pageSpeed.loadTime.toFixed(2)}s</div>
                  <div>Page Size: {auditResult.pageSpeed.pageSize}KB</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">On-Page SEO</CardTitle>
                <Search className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${getScoreColor(auditResult.onPageSeo.score)}`}>
                  {auditResult.onPageSeo.score}
                </div>
                <div className="space-y-1 mt-2 text-sm">
                  <div className="flex items-center gap-2">
                    {auditResult.onPageSeo.titleTag.present ? (
                      <CheckCircle className="h-3 w-3 text-green-600" />
                    ) : (
                      <XCircle className="h-3 w-3 text-red-600" />
                    )}
                    <span>Title Tag</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {auditResult.onPageSeo.metaDescription.present ? (
                      <CheckCircle className="h-3 w-3 text-green-600" />
                    ) : (
                      <XCircle className="h-3 w-3 text-red-600" />
                    )}
                    <span>Meta Description</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Technical SEO</CardTitle>
                <Settings className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${getScoreColor(auditResult.technicalSeo.score)}`}>
                  {auditResult.technicalSeo.score}
                </div>
                <div className="space-y-1 mt-2 text-sm">
                  <div className="flex items-center gap-2">
                    {auditResult.technicalSeo.ssl ? (
                      <CheckCircle className="h-3 w-3 text-green-600" />
                    ) : (
                      <XCircle className="h-3 w-3 text-red-600" />
                    )}
                    <span>SSL Certificate</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {auditResult.technicalSeo.sitemap ? (
                      <CheckCircle className="h-3 w-3 text-green-600" />
                    ) : (
                      <XCircle className="h-3 w-3 text-red-600" />
                    )}
                    <span>XML Sitemap</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Broken Links</CardTitle>
                <LinkIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${getScoreColor(auditResult.brokenLinks.score)}`}>
                  {auditResult.brokenLinks.score}
                </div>
                <div className="space-y-1 mt-2 text-sm text-muted-foreground">
                  <div>Total Links: {auditResult.brokenLinks.total}</div>
                  <div className="text-red-600">Broken: {auditResult.brokenLinks.broken}</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Detailed Analysis & Recommendations</CardTitle>
              <CardDescription>Comprehensive audit results with actionable solutions</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="recommendations" className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
                  <TabsTrigger value="pagespeed">Page Speed</TabsTrigger>
                  <TabsTrigger value="onpage">On-Page SEO</TabsTrigger>
                  <TabsTrigger value="technical">Technical SEO</TabsTrigger>
                  <TabsTrigger value="links">Broken Links</TabsTrigger>
                </TabsList>

                <TabsContent value="recommendations" className="space-y-4">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">Priority Recommendations</h3>
                    <p className="text-sm text-muted-foreground">
                      Sorted by impact and priority for maximum improvement
                    </p>
                  </div>
                  {auditResult.recommendations.map((rec, index) => (
                    <Alert key={index}>
                      {getImpactIcon(rec.impact)}
                      <AlertDescription>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{rec.category}</Badge>
                            <Badge
                              variant={
                                rec.impact === "high"
                                  ? "destructive"
                                  : rec.impact === "medium"
                                    ? "secondary"
                                    : "default"
                              }
                            >
                              {rec.impact} impact
                            </Badge>
                            <Badge variant="outline">Priority {rec.priority}</Badge>
                          </div>
                          <div className="font-medium">{rec.issue}</div>
                          <div className="text-sm text-muted-foreground">{rec.solution}</div>
                        </div>
                      </AlertDescription>
                    </Alert>
                  ))}
                </TabsContent>

                <TabsContent value="pagespeed" className="space-y-4">
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-blue-600" />
                        <div>
                          <div className="font-medium">Page Load Time</div>
                          <div className="text-sm text-muted-foreground">Total time to load the page</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{auditResult.pageSpeed.loadTime.toFixed(2)}s</div>
                        <div className="text-sm text-muted-foreground">
                          {auditResult.pageSpeed.loadTime < 2
                            ? "Good"
                            : auditResult.pageSpeed.loadTime < 4
                              ? "Average"
                              : "Slow"}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Eye className="h-5 w-5 text-green-600" />
                        <div>
                          <div className="font-medium">First Contentful Paint</div>
                          <div className="text-sm text-muted-foreground">Time to first visible content</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{auditResult.pageSpeed.firstContentfulPaint.toFixed(2)}s</div>
                        <div className="text-sm text-muted-foreground">
                          {auditResult.pageSpeed.firstContentfulPaint < 1.8 ? "Good" : "Needs Work"}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <TrendingUp className="h-5 w-5 text-purple-600" />
                        <div>
                          <div className="font-medium">Largest Contentful Paint</div>
                          <div className="text-sm text-muted-foreground">Time to largest content element</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{auditResult.pageSpeed.largestContentfulPaint.toFixed(2)}s</div>
                        <div className="text-sm text-muted-foreground">
                          {auditResult.pageSpeed.largestContentfulPaint < 2.5 ? "Good" : "Needs Work"}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-orange-600" />
                        <div>
                          <div className="font-medium">Page Size</div>
                          <div className="text-sm text-muted-foreground">Total size of all resources</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{auditResult.pageSpeed.pageSize}KB</div>
                        <div className="text-sm text-muted-foreground">
                          {auditResult.pageSpeed.pageSize < 1000
                            ? "Good"
                            : auditResult.pageSpeed.pageSize < 2000
                              ? "Average"
                              : "Large"}
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="onpage" className="space-y-4">
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-blue-600" />
                        <div>
                          <div className="font-medium">Title Tag</div>
                          <div className="text-sm text-muted-foreground">
                            Length: {auditResult.onPageSeo.titleTag.length} characters
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {auditResult.onPageSeo.titleTag.present && auditResult.onPageSeo.titleTag.optimized ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-600" />
                        )}
                        <span className="font-medium">
                          {auditResult.onPageSeo.titleTag.optimized ? "Optimized" : "Needs Work"}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Eye className="h-5 w-5 text-purple-600" />
                        <div>
                          <div className="font-medium">Meta Description</div>
                          <div className="text-sm text-muted-foreground">
                            Length: {auditResult.onPageSeo.metaDescription.length} characters
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {auditResult.onPageSeo.metaDescription.present &&
                        auditResult.onPageSeo.metaDescription.optimized ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-600" />
                        )}
                        <span className="font-medium">
                          {auditResult.onPageSeo.metaDescription.optimized ? "Optimized" : "Needs Work"}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <ImageIcon className="h-5 w-5 text-green-600" />
                        <div>
                          <div className="font-medium">Images with Alt Text</div>
                          <div className="text-sm text-muted-foreground">
                            {auditResult.onPageSeo.images.withAlt} of {auditResult.onPageSeo.images.total} images
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">
                          {Math.round(
                            (auditResult.onPageSeo.images.withAlt / auditResult.onPageSeo.images.total) * 100,
                          )}
                          %
                        </div>
                        <div className="text-sm text-muted-foreground">Coverage</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <LinkIcon className="h-5 w-5 text-blue-600" />
                        <div>
                          <div className="font-medium">Internal Links</div>
                          <div className="text-sm text-muted-foreground">Links to other pages on your site</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{auditResult.onPageSeo.internalLinks}</div>
                        <div className="text-sm text-muted-foreground">
                          {auditResult.onPageSeo.internalLinks > 10 ? "Good" : "Could improve"}
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="technical" className="space-y-4">
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Shield className="h-5 w-5 text-green-600" />
                        <div>
                          <div className="font-medium">SSL Certificate</div>
                          <div className="text-sm text-muted-foreground">HTTPS encryption enabled</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {auditResult.technicalSeo.ssl ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-600" />
                        )}
                        <span className="font-medium">{auditResult.technicalSeo.ssl ? "Enabled" : "Disabled"}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Smartphone className="h-5 w-5 text-blue-600" />
                        <div>
                          <div className="font-medium">Mobile Friendly</div>
                          <div className="text-sm text-muted-foreground">Responsive design for mobile devices</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {auditResult.technicalSeo.mobile ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-600" />
                        )}
                        <span className="font-medium">{auditResult.technicalSeo.mobile ? "Yes" : "No"}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-purple-600" />
                        <div>
                          <div className="font-medium">XML Sitemap</div>
                          <div className="text-sm text-muted-foreground">Helps search engines index your site</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {auditResult.technicalSeo.sitemap ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-600" />
                        )}
                        <span className="font-medium">{auditResult.technicalSeo.sitemap ? "Found" : "Missing"}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Settings className="h-5 w-5 text-orange-600" />
                        <div>
                          <div className="font-medium">Robots.txt</div>
                          <div className="text-sm text-muted-foreground">Controls search engine crawling</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {auditResult.technicalSeo.robotsTxt ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-600" />
                        )}
                        <span className="font-medium">{auditResult.technicalSeo.robotsTxt ? "Found" : "Missing"}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Search className="h-5 w-5 text-indigo-600" />
                        <div>
                          <div className="font-medium">Schema Markup</div>
                          <div className="text-sm text-muted-foreground">Structured data for rich snippets</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {auditResult.technicalSeo.schemaMarkup ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-600" />
                        )}
                        <span className="font-medium">
                          {auditResult.technicalSeo.schemaMarkup ? "Found" : "Missing"}
                        </span>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="links" className="space-y-4">
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <LinkIcon className="h-5 w-5 text-blue-600" />
                        <div>
                          <div className="font-medium">Total Links Checked</div>
                          <div className="text-sm text-muted-foreground">Internal and external links</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{auditResult.brokenLinks.total}</div>
                        <div className="text-sm text-muted-foreground">Links</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <XCircle className="h-5 w-5 text-red-600" />
                        <div>
                          <div className="font-medium">Broken Links</div>
                          <div className="text-sm text-muted-foreground">Links returning 4xx or 5xx errors</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-red-600">{auditResult.brokenLinks.broken}</div>
                        <div className="text-sm text-muted-foreground">Errors</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <ExternalLink className="h-5 w-5 text-yellow-600" />
                        <div>
                          <div className="font-medium">Redirects</div>
                          <div className="text-sm text-muted-foreground">Links with 3xx redirect responses</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-yellow-600">{auditResult.brokenLinks.redirects}</div>
                        <div className="text-sm text-muted-foreground">Redirects</div>
                      </div>
                    </div>

                    {auditResult.brokenLinks.links.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="font-medium">Issues Found:</h4>
                        {auditResult.brokenLinks.links.map((link, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-2">
                              {link.type === "broken" ? (
                                <XCircle className="h-4 w-4 text-red-600" />
                              ) : (
                                <ExternalLink className="h-4 w-4 text-yellow-600" />
                              )}
                              <span className="font-mono text-sm">{link.url}</span>
                            </div>
                            <Badge variant={link.type === "broken" ? "destructive" : "secondary"}>{link.status}</Badge>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2">
            <Globe className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">OG Site Audit</h1>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Complete Website Performance Analysis</h2>
        <p className="text-xl text-gray-600 mb-8">
          Get comprehensive insights into your website's page speed, SEO, technical health, and broken links with
          actionable recommendations
        </p>

        {/* URL Input Form */}
        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  type="url"
                  placeholder="Enter your website URL (e.g., https://example.com)"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleAudit} size="lg" className="px-8">
                  <Search className="w-4 h-4 mr-2" />
                  Audit Website
                </Button>
              </div>
              {error && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Page Speed</h3>
            <p className="text-gray-600">Analyze load times, Core Web Vitals, and performance metrics</p>
          </div>

          <div className="text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">On-Page SEO</h3>
            <p className="text-gray-600">Check title tags, meta descriptions, headings, and content optimization</p>
          </div>

          <div className="text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Settings className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Technical SEO</h3>
            <p className="text-gray-600">Verify SSL, sitemaps, robots.txt, and technical best practices</p>
          </div>

          <div className="text-center">
            <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <LinkIcon className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Broken Links</h3>
            <p className="text-gray-600">Detect and report broken links and redirect issues</p>
          </div>
        </div>
      </div>
    </div>
  )
}
