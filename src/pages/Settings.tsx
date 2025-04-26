
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

const Settings = () => {
  const [settings, setSettings] = useState({
    pushNotifications: true,
    smsAlerts: false,
    fillThreshold: 75, // Default threshold
  });

  const handleSliderChange = (value: number[]) => {
    setSettings(prev => ({ ...prev, fillThreshold: value[0] }));
  };

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
          <div className="space-y-4">
            <div className="space-y-1">
              <Label>Fill Level Alert Threshold</Label>
              <p className="text-sm text-gray-500">
                Set the fill level percentage at which you want to receive notifications
              </p>
            </div>
            <div className="space-y-2">
              <Slider
                value={[settings.fillThreshold]}
                onValueChange={handleSliderChange}
                min={50}
                max={95}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>50%</span>
                <span>{settings.fillThreshold}%</span>
                <span>95%</span>
              </div>
            </div>
          </div>
          <Button className="w-full mt-6">Save Preferences</Button>
        </div>
      </Card>
    </div>
  );
};

export default Settings;
