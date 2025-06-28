import { useState, useEffect } from 'react';
import { Thermometer, Droplets, Wind, Wifi, WifiOff, Beaker } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Index = () => {
  const [isConnected, setIsConnected] = useState(true);
  const [sensorData, setSensorData] = useState({
    temperature: 23.5,
    humidity: 65.2,
    co2: 412,
    ammonia: 2.8
  });

  // Simulate real-time data updates (replace with actual API calls)
  useEffect(() => {
    const interval = setInterval(() => {
      setSensorData(prev => ({
        temperature: Math.round((prev.temperature + (Math.random() - 0.5) * 2) * 10) / 10,
        humidity: Math.round((prev.humidity + (Math.random() - 0.5) * 5) * 10) / 10,
        co2: Math.round(prev.co2 + (Math.random() - 0.5) * 20),
        ammonia: Math.round((prev.ammonia + (Math.random() - 0.5) * 0.5) * 10) / 10
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getTemperatureColor = (temp: number) => {
    if (temp < 18) return 'text-blue-600';
    if (temp > 26) return 'text-red-500';
    return 'text-green-600';
  };

  const getHumidityColor = (humidity: number) => {
    if (humidity < 30 || humidity > 70) return 'text-orange-500';
    return 'text-blue-600';
  };

  const getCO2Color = (co2: number) => {
    if (co2 > 1000) return 'text-red-500';
    if (co2 > 600) return 'text-orange-500';
    return 'text-green-600';
  };

  const getAmmoniaColor = (ammonia: number) => {
    if (ammonia > 10) return 'text-red-500';
    if (ammonia > 5) return 'text-orange-500';
    return 'text-green-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                <Wind className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Air Quality Monitor
              </h1>
            </div>
            <div className="flex items-center gap-2">
              {isConnected ? (
                <div className="flex items-center gap-2 text-green-600">
                  <Wifi className="w-4 h-4" />
                  <span className="text-sm font-medium">Connected</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-red-500">
                  <WifiOff className="w-4 h-4" />
                  <span className="text-sm font-medium">Disconnected</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Dashboard */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Temperature Card */}
          <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm hover:bg-white/90">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-red-400 to-orange-400 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Thermometer className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Temperature</h3>
                    <p className="text-sm text-gray-500">Current reading</p>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-3xl font-bold ${getTemperatureColor(sensorData.temperature)} transition-colors`}>
                  {sensorData.temperature}°C
                </div>
                <div className="text-sm text-gray-400 mt-1">
                  {sensorData.temperature < 18 ? 'Cold' : sensorData.temperature > 26 ? 'Warm' : 'Optimal'}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Humidity Card */}
          <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm hover:bg-white/90">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Droplets className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Humidity</h3>
                    <p className="text-sm text-gray-500">Relative humidity</p>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-3xl font-bold ${getHumidityColor(sensorData.humidity)} transition-colors`}>
                  {sensorData.humidity}%
                </div>
                <div className="text-sm text-gray-400 mt-1">
                  {sensorData.humidity < 30 || sensorData.humidity > 70 ? 'Suboptimal' : 'Good'}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CO2 Card */}
          <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm hover:bg-white/90">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-400 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Wind className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">CO₂ Level</h3>
                    <p className="text-sm text-gray-500">Air quality</p>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-3xl font-bold ${getCO2Color(sensorData.co2)} transition-colors`}>
                  {sensorData.co2} <span className="text-lg">ppm</span>
                </div>
                <div className="text-sm text-gray-400 mt-1">
                  {sensorData.co2 > 1000 ? 'Poor' : sensorData.co2 > 600 ? 'Moderate' : 'Good'}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ammonia Card */}
          <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm hover:bg-white/90">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-violet-400 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Beaker className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Ammonia</h3>
                    <p className="text-sm text-gray-500">Gas concentration</p>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-3xl font-bold ${getAmmoniaColor(sensorData.ammonia)} transition-colors`}>
                  {sensorData.ammonia} <span className="text-lg">ppm</span>
                </div>
                <div className="text-sm text-gray-400 mt-1">
                  {sensorData.ammonia > 10 ? 'High' : sensorData.ammonia > 5 ? 'Moderate' : 'Low'}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Status Section */}
        <div className="mt-8">
          <Card className="border-0 bg-white/70 backdrop-blur-sm">
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-800 mb-4">System Status</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-600">ESP32 Connected</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-600">Sensors Active</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-600">Data Streaming</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 py-6 text-center text-sm text-gray-500 border-t border-gray-200/50">
        <div className="max-w-6xl mx-auto px-4">
          <p>&copy; 2024 Air Quality Monitor. Built for ESP32 IoT sensors.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
