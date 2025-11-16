import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TextInput, Button, ScrollView, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import OpenAIService from './services/openai';
import pluginManager from './plugins/manager';

export default function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // load example plugin
    pluginManager.register(require('./plugins/examplePlugin').default);
    pluginManager.init();
  }, []);

  async function send() {
    if (!input) return;
    const userMsg = { role: 'user', text: input, time: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);
    try {
      // plugins can intercept or augment request
      const pluginCtx = await pluginManager.runBeforeRequest({ input, messages });
      const resp = await OpenAIService.sendMessage(pluginCtx.input || input, pluginCtx.messages || messages);
      const assistantMsg = { role: 'assistant', text: resp.text, time: Date.now() };
      setMessages(prev => [...prev, assistantMsg]);
      // plugins after response
      pluginManager.runAfterResponse({ input, response: resp, messages: [...messages, assistantMsg] });
    } catch (e) {
      setMessages(prev => [...prev, { role: 'assistant', text: 'Hiba: ' + e.message }]);
    } finally {
      setLoading(false);
      setInput('');
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}><Text style={styles.title}>PekaAI (Advanced)</Text></View>
      <ScrollView style={styles.chat}>
        {messages.map((m, i) => (
          <View key={i} style={m.role === 'user' ? styles.userMsg : styles.assistantMsg}>
            <Text>{m.text}</Text>
          </View>
        ))}
        {loading && <Text>Loading...</Text>}
      </ScrollView>
      <View style={styles.inputRow}>
        <TextInput style={styles.input} value={input} onChangeText={setInput} placeholder="Írj ide..." />
        <Button title="Küld" onPress={send} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { padding: 12, borderBottomWidth: 1, borderColor: '#ddd' },
  title: { fontSize: 18, fontWeight: '600' },
  chat: { flex: 1, padding: 12 },
  userMsg: { alignSelf: 'flex-end', backgroundColor: '#e6f7ff', padding: 8, borderRadius: 8, marginVertical: 4 },
  assistantMsg: { alignSelf: 'flex-start', backgroundColor: '#f2f2f2', padding: 8, borderRadius: 8, marginVertical: 4 },
  inputRow: { flexDirection: 'row', padding: 8, borderTopWidth: 1, borderColor: '#eee' },
  input: { flex: 1, borderWidth: 1, borderColor: '#ddd', borderRadius: 6, paddingHorizontal: 8, marginRight: 8 }
});
