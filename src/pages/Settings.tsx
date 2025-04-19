
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const Settings = () => {
  const [settings, setSettings] = useState({
    pushNotifications: true,
    smsAlerts: false,
  });

  return (
    <div className="max-w-md mx-auto">
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-6">Notification Preferences</h2>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Push Notifications</Label>
              <p className="text-sm text-gray-500">
                Receive alerts on your device
              </p>
            </div>
            <Switch
              checked={settings.pushNotifications}
              onCheckedChange={(checked) =>
                setSettings((s) => ({ ...s, pushNotifications: checked }))
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>SMS Alerts</Label>
              <p className="text-sm text-gray-500">
                Get notifications via text message
              </p>
            </div>
            <Switch
              checked={settings.smsAlerts}
              onCheckedChange={(checked) =>
                setSettings((s) => ({ ...s, smsAlerts: checked }))
              }
            />
          </div>
          <Button className="w-full mt-6">Save Preferences</Button>
        </div>
      </Card>
    </div>
  );
};

export default Settings;
