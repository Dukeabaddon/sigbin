
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - replace with actual auth later
    if (email && password) {
      toast({
        title: "Welcome back!",
        description: "Successfully logged in to S.I.G. Bin",
      });
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
            S.I.G. Bin
          </h1>
          <p className="mt-2 text-gray-600">
            Smart Waste Segregation System
          </p>
        </div>
        
        <Card className="p-6 backdrop-blur-sm bg-white/80 border-t border-green-100/50">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Input 
                type="email" 
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/50"
                required 
              />
              <Input 
                type="password" 
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white/50"
                required 
              />
            </div>
            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
              Sign in
            </Button>
          </form>
          <div className="mt-4 text-center text-sm text-gray-500">
            <p>Quezon City University</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;
