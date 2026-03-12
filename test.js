

async function testChat() {
    try {
        const response = await fetch('http://localhost:3001/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                conversation: [
                    { role: 'user', parts: [{ text: 'Halo, ini siapa ya?'}] }
                ]
            })
        });
        
        const data = await response.json();
        console.log('Status:', response.status);
        console.log('Response:', data);
    } catch (err) {
        console.error('Fetch error:', err);
    }
}

testChat();
