"use client";

import { useState } from "react";
import { Building2, Cpu, KeyRound, BellRing, PaintBucket } from "lucide-react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
  const [forecastModel, setForecastModel] = useState("ensemble-v3");
  const [theme, setTheme] = useState("light");
  const [notifyHigh, setNotifyHigh] = useState(true);
  const [notifyMedium, setNotifyMedium] = useState(true);
  const [notifyLow, setNotifyLow] = useState(false);

  return (
    <div className="flex flex-col gap-8">
      <SectionHeader
        eyebrow="Configuration"
        title="Settings"
        description="Manage company profile, forecasting model, notification rules and integrations."
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <SettingsCard icon={Building2} title="Company" description="Tenant profile for this accelerator instance.">
          <FieldRow label="Organization">
            <Input defaultValue="Aditya Birla Group — Paints & Coatings" />
          </FieldRow>
          <FieldRow label="Primary Region">
            <Select defaultValue="India">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="India">India</SelectItem>
                <SelectItem value="South Asia">South Asia</SelectItem>
                <SelectItem value="Global">Global</SelectItem>
              </SelectContent>
            </Select>
          </FieldRow>
          <FieldRow label="Fiscal Year Start">
            <Select defaultValue="april">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="april">April</SelectItem>
                <SelectItem value="january">January</SelectItem>
              </SelectContent>
            </Select>
          </FieldRow>
        </SettingsCard>

        <SettingsCard icon={Cpu} title="Forecast Model" description="AI model configuration for demand forecasting.">
          <FieldRow label="Active Model">
            <Select value={forecastModel} onValueChange={setForecastModel}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ensemble-v3">Pibythree Ensemble v3</SelectItem>
                <SelectItem value="prophet">Prophet + Seasonal Decompose</SelectItem>
                <SelectItem value="lstm">Deep LSTM Network</SelectItem>
              </SelectContent>
            </Select>
          </FieldRow>
          <div className="flex items-center justify-between rounded-lg bg-surface p-3">
            <div>
              <p className="text-sm font-medium text-foreground">Auto-retrain weekly</p>
              <p className="text-xs text-muted-foreground">Refresh model weights every Monday</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between rounded-lg bg-surface p-3">
            <div>
              <p className="text-sm font-medium text-foreground">Include external signals</p>
              <p className="text-xs text-muted-foreground">Weather, festival calendar, fuel index</p>
            </div>
            <Switch defaultChecked />
          </div>
        </SettingsCard>

        <SettingsCard icon={BellRing} title="Notification Rules" description="Choose which AI alerts reach your team.">
          <RuleRow label="High risk alerts" checked={notifyHigh} onChange={setNotifyHigh} />
          <RuleRow label="Medium risk alerts" checked={notifyMedium} onChange={setNotifyMedium} />
          <RuleRow label="Low risk alerts" checked={notifyLow} onChange={setNotifyLow} />
        </SettingsCard>

        <SettingsCard icon={PaintBucket} title="Theme" description="Display preferences for this workspace.">
          <FieldRow label="Appearance">
            <Select value={theme} onValueChange={setTheme}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light (Enterprise)</SelectItem>
                <SelectItem value="light-compact">Light — Compact</SelectItem>
              </SelectContent>
            </Select>
          </FieldRow>
          <p className="rounded-lg bg-surface p-3 text-xs text-muted-foreground">
            Pibythree SupplySense AI is designed as a light, enterprise-grade interface. Dark mode
            is not offered in this accelerator to keep the experience consistent with executive
            reporting standards.
          </p>
        </SettingsCard>

        <SettingsCard
          icon={KeyRound}
          title="API Integration"
          description="Connect this accelerator to your enterprise systems."
          className="lg:col-span-2"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <IntegrationTile name="SAP ERP" status="Not Connected" />
            <IntegrationTile name="Snowflake" status="Not Connected" />
            <IntegrationTile name="MES Platform" status="Not Connected" />
          </div>
          <FieldRow label="API Endpoint">
            <Input placeholder="https://api.yourcompany.com/v1" />
          </FieldRow>
          <FieldRow label="API Key">
            <Input type="password" placeholder="••••••••••••••••" />
          </FieldRow>
        </SettingsCard>
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="outline">Cancel</Button>
        <Button>Save Changes</Button>
      </div>
    </div>
  );
}

function SettingsCard({
  icon: Icon,
  title,
  description,
  children,
  className,
}: {
  icon: typeof Building2;
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Card className={className}>
      <CardHeader className="flex-row items-center gap-2 space-y-0">
        <span className="flex size-8 items-center justify-center rounded-md bg-primary-soft text-primary">
          <Icon className="size-4" />
        </span>
        <div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 pt-0">{children}</CardContent>
    </Card>
  );
}

function FieldRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}

function RuleRow({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-surface p-3">
      <p className="text-sm font-medium text-foreground">{label}</p>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );
}

function IntegrationTile({ name, status }: { name: string; status: string }) {
  return (
    <div className="rounded-lg border border-border-subtle bg-surface p-4">
      <p className="text-sm font-semibold text-foreground">{name}</p>
      <Badge variant="neutral" className="mt-2">
        {status}
      </Badge>
      <Separator className="my-3" />
      <Button variant="outline" size="sm" className="w-full">
        Configure
      </Button>
    </div>
  );
}
