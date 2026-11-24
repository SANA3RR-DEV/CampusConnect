import { useEffect, useState } from "react";
import { ActivityIndicator, Platform, Pressable, StyleSheet, Text, View } from "react-native";

const API_URL = process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:8000";

type Health = { status: string; service: string };

export default function HomeScreen() {
  const [health, setHealth] = useState<Health | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  async function checkBackend() {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/health`);
      if (!response.ok) throw new Error(`Backend returned ${response.status}`);
      setHealth((await response.json()) as Health);
    } catch {
      setHealth(null);
      setError("Cannot reach the backend. Start FastAPI and check EXPO_PUBLIC_API_URL.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { void checkBackend(); }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>THE ACADEMIC SOCIAL NETWORK</Text>
      <Text style={styles.title}>CampusConnect</Text>
      <Text style={styles.subtitle}>Learn. Create. Connect. Collaborate.</Text>
      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Phase 1 · Foundation</Text>
        {loading ? <ActivityIndicator /> : null}
        {health ? <Text style={styles.success}>Backend connected · {health.service}</Text> : null}
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <Pressable style={styles.button} onPress={() => void checkBackend()}>
          <Text style={styles.buttonText}>Check connection</Text>
        </Pressable>
      </View>
      <Text style={styles.footer}>Web · Android · iOS · {Platform.OS}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 28, backgroundColor: "#F5F7FB" },
  eyebrow: { color: "#4263EB", fontSize: 11, fontWeight: "700", letterSpacing: 2 },
  title: { color: "#14213D", fontSize: 38, fontWeight: "800", marginTop: 10 },
  subtitle: { color: "#5C677D", fontSize: 16, marginTop: 8 },
  panel: { backgroundColor: "#FFFFFF", padding: 22, borderRadius: 18, marginTop: 34, gap: 14, shadowColor: "#14213D", shadowOpacity: 0.08, shadowRadius: 18, elevation: 3 },
  panelTitle: { color: "#14213D", fontSize: 18, fontWeight: "700" },
  success: { color: "#16834A" },
  error: { color: "#B42318" },
  button: { backgroundColor: "#3157D5", padding: 14, borderRadius: 12, alignItems: "center" },
  buttonText: { color: "#FFFFFF", fontWeight: "700" },
  footer: { color: "#7A8497", fontSize: 12, marginTop: 24, textAlign: "center" }
});
