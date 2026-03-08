import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Trophy, User, BarChart3, Calendar, Bell, FileText, LogOut, ChevronRight,
  TrendingUp, TrendingDown, CheckCircle, AlertCircle, Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { dashboardChild } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadialBarChart, RadialBar, Legend
} from "recharts";

/* ─── Login Screen ─── */
const LoginScreen = ({ onLogin }: { onLogin: () => void }) => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({ title: "Please fill all fields", variant: "destructive" });
      return;
    }
    // Mock login
    toast({ title: "Welcome back! 👋" });
    onLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-primary/90 to-foreground p-4">
      <Card className="w-full max-w-md border-border/50 bg-card">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="font-heading font-bold text-2xl text-foreground">Member Login</h1>
            <p className="text-muted-foreground text-sm mt-1">Access your child's dashboard</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label className="font-subheading font-medium text-foreground">Email</Label>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1" placeholder="parent@email.com" />
            </div>
            <div>
              <Label className="font-subheading font-medium text-foreground">Password</Label>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1" placeholder="••••••••" />
            </div>
            <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl font-subheading font-semibold">
              Sign In
            </Button>
          </form>
          <p className="text-center text-xs text-muted-foreground mt-4">
            Demo: Use any email & password
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

/* ─── Dashboard Content ─── */
const DashboardContent = ({ onLogout }: { onLogout: () => void }) => {
  const child = dashboardChild;
  const [activeTab, setActiveTab] = useState("overview");

  const swimData = child.performance.swimming.history;
  const tennisData = child.performance.tennis.history;

  const radialData = [
    { name: "Swimming", value: child.performance.swimming.overall, fill: "hsl(213 100% 36%)" },
    { name: "Tennis", value: child.performance.tennis.overall, fill: "hsl(51 100% 50%)" },
  ];

  const sidebarItems = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "performance", label: "Performance", icon: TrendingUp },
    { id: "schedule", label: "Schedule", icon: Calendar },
    { id: "notifications", label: "Notifications", icon: Bell },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 bg-card border-r border-border flex-col">
        <div className="p-6 border-b border-border">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
              <Trophy className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <span className="font-heading font-bold text-sm text-foreground block leading-tight">Champions</span>
              <span className="text-[9px] font-subheading text-gold uppercase tracking-widest">Dashboard</span>
            </div>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-subheading transition-all ${activeTab === item.id ? "bg-primary/10 text-primary font-semibold" : "text-muted-foreground hover:bg-secondary"}`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-border">
          <button onClick={onLogout} className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all font-subheading">
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 overflow-auto">
        {/* Top bar */}
        <header className="sticky top-0 z-10 bg-card/95 backdrop-blur-md border-b border-border px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-heading font-bold text-xl text-foreground">{child.name}'s Dashboard</h1>
            <p className="text-muted-foreground text-xs font-subheading">Member ID: {child.memberId} · {child.plan} Plan</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-accent-red border-2 border-card" />
            </div>
            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center font-heading font-bold text-primary text-sm">YA</div>
          </div>
        </header>

        {/* Mobile tabs */}
        <div className="md:hidden px-4 pt-4">
          <div className="flex gap-2 overflow-auto">
            {sidebarItems.map((item) => (
              <button key={item.id} onClick={() => setActiveTab(item.id)} className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-subheading whitespace-nowrap transition-all ${activeTab === item.id ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>
                <item.icon className="w-3.5 h-3.5" />{item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {/* Overview */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Quick stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Attendance", value: `${child.attendance.percentage}%`, icon: CheckCircle, color: "text-accent-green" },
                  { label: "Sessions Attended", value: child.attendance.attended, icon: Calendar, color: "text-primary" },
                  { label: "Sports Active", value: child.sports.length, icon: TrendingUp, color: "text-gold" },
                  { label: "Notifications", value: child.notifications.filter((n) => !n.read).length, icon: Bell, color: "text-accent-red" },
                ].map((stat, i) => (
                  <Card key={i} className="border-border/50 bg-card hover:shadow-md transition-all">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <stat.icon className={`w-5 h-5 ${stat.color}`} />
                      </div>
                      <div className="font-heading font-bold text-2xl text-foreground">{stat.value}</div>
                      <p className="text-muted-foreground text-xs font-subheading">{stat.label}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Performance Overview */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-border/50 bg-card">
                  <CardContent className="p-6">
                    <h3 className="font-heading font-bold text-foreground mb-4">Sport Performance</h3>
                    <div className="h-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadialBarChart cx="50%" cy="50%" innerRadius="30%" outerRadius="90%" data={radialData}>
                          <RadialBar dataKey="value" cornerRadius={8} />
                          <Legend iconType="circle" wrapperStyle={{ fontSize: "12px" }} />
                          <Tooltip />
                        </RadialBarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border/50 bg-card">
                  <CardContent className="p-6">
                    <h3 className="font-heading font-bold text-foreground mb-4">Progress Over Time</h3>
                    <div className="h-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={swimData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                          <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                          <YAxis domain={[50, 100]} tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                          <Tooltip />
                          <Line type="monotone" dataKey="score" stroke="hsl(213 100% 36%)" strokeWidth={2} dot={{ r: 4 }} name="Swimming" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Strengths & Improvements */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-accent-green/20 bg-card">
                  <CardContent className="p-6">
                    <h3 className="font-heading font-bold text-foreground mb-3 flex items-center gap-2"><TrendingUp className="w-4 h-4 text-accent-green" /> Strengths</h3>
                    <ul className="space-y-2">
                      {child.strengths.map((s) => (
                        <li key={s} className="flex items-center gap-2 text-sm text-foreground/80">
                          <CheckCircle className="w-4 h-4 text-accent-green" />{s}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                <Card className="border-gold/20 bg-card">
                  <CardContent className="p-6">
                    <h3 className="font-heading font-bold text-foreground mb-3 flex items-center gap-2"><AlertCircle className="w-4 h-4 text-gold" /> Areas to Improve</h3>
                    <ul className="space-y-2">
                      {child.improvements.map((s) => (
                        <li key={s} className="flex items-center gap-2 text-sm text-foreground/80">
                          <TrendingDown className="w-4 h-4 text-gold" />{s}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Performance Tab */}
          {activeTab === "performance" && (
            <div className="space-y-6">
              <Tabs defaultValue="swimming" className="w-full">
                <TabsList className="grid w-full max-w-sm grid-cols-2">
                  <TabsTrigger value="swimming" className="font-subheading">🏊 Swimming</TabsTrigger>
                  <TabsTrigger value="tennis" className="font-subheading">🎾 Tennis</TabsTrigger>
                </TabsList>
                <TabsContent value="swimming" className="mt-6 space-y-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: "Overall", value: child.performance.swimming.overall },
                      { label: "Speed", value: child.performance.swimming.speed },
                      { label: "Technique", value: child.performance.swimming.technique },
                      { label: "Endurance", value: child.performance.swimming.endurance },
                    ].map((m) => (
                      <Card key={m.label} className="border-border/50 bg-card">
                        <CardContent className="p-4">
                          <p className="text-muted-foreground text-xs font-subheading mb-2">{m.label}</p>
                          <div className="font-heading font-bold text-2xl text-primary mb-2">{m.value}%</div>
                          <Progress value={m.value} className="h-2" />
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  <Card className="border-border/50 bg-card">
                    <CardContent className="p-6">
                      <h3 className="font-heading font-bold text-foreground mb-4">Swimming Progress</h3>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={swimData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                            <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                            <YAxis domain={[60, 100]} tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                            <Tooltip />
                            <Line type="monotone" dataKey="score" stroke="hsl(213 100% 36%)" strokeWidth={3} dot={{ r: 5 }} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="tennis" className="mt-6 space-y-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                      { label: "Overall", value: child.performance.tennis.overall },
                      { label: "Serve", value: child.performance.tennis.serve },
                      { label: "Forehand", value: child.performance.tennis.forehand },
                    ].map((m) => (
                      <Card key={m.label} className="border-border/50 bg-card">
                        <CardContent className="p-4">
                          <p className="text-muted-foreground text-xs font-subheading mb-2">{m.label}</p>
                          <div className="font-heading font-bold text-2xl text-gold mb-2">{m.value}%</div>
                          <Progress value={m.value} className="h-2" />
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  <Card className="border-border/50 bg-card">
                    <CardContent className="p-6">
                      <h3 className="font-heading font-bold text-foreground mb-4">Tennis Progress</h3>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={tennisData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                            <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                            <YAxis domain={[50, 100]} tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                            <Tooltip />
                            <Line type="monotone" dataKey="score" stroke="hsl(51 100% 50%)" strokeWidth={3} dot={{ r: 5 }} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}

          {/* Schedule Tab */}
          {activeTab === "schedule" && (
            <div className="space-y-4">
              <h2 className="font-heading font-bold text-xl text-foreground">Upcoming Classes</h2>
              {child.upcomingClasses.map((cls, i) => (
                <Card key={i} className="border-border/50 bg-card hover:shadow-md transition-all">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl shrink-0">
                      {cls.sport === "Swimming" ? "🏊" : "🎾"}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-subheading font-semibold text-foreground">{cls.sport}</h4>
                      <p className="text-muted-foreground text-xs">with {cls.coach}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-foreground text-sm font-subheading font-medium">{cls.date}</p>
                      <p className="text-muted-foreground text-xs flex items-center gap-1 justify-end"><Clock className="w-3 h-3" />{cls.time}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button variant="outline" className="w-full rounded-xl font-subheading border-primary text-primary hover:bg-primary hover:text-primary-foreground mt-4">
                <FileText className="w-4 h-4 mr-1" /> Download PDF Report
              </Button>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === "notifications" && (
            <div className="space-y-3">
              <h2 className="font-heading font-bold text-xl text-foreground">Notifications</h2>
              {child.notifications.map((n) => (
                <Card key={n.id} className={`border-border/50 bg-card transition-all hover:shadow-md ${!n.read ? "border-l-4 border-l-primary" : ""}`}>
                  <CardContent className="p-4 flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${!n.read ? "bg-primary" : "bg-transparent"}`} />
                    <div className="flex-1">
                      <p className="text-foreground text-sm">{n.message}</p>
                      <p className="text-muted-foreground text-xs mt-1">{n.date}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* ─── Main Dashboard ─── */
const Dashboard = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  if (!loggedIn) return <LoginScreen onLogin={() => setLoggedIn(true)} />;
  return <DashboardContent onLogout={() => setLoggedIn(false)} />;
};

export default Dashboard;
