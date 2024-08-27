const { ipcRenderer } = require('electron');

document.getElementById('scanButton').addEventListener('click', async () => {
    const host = document.getElementById('host').value;
    const startPort = parseInt(document.getElementById('startPort').value);
    const endPort = parseInt(document.getElementById('endPort').value);

    document.getElementById('results').innerText = 'Scanning...';

    const openPorts = await ipcRenderer.invoke('scan-ports', host, startPort, endPort);

    let resultText = 'Open Ports:\n';
    if (openPorts.length > 0) {
        openPorts.forEach(port => {
            resultText += `Port ${port} is open\n`;
        });
    } else {
        resultText = 'No open ports found';
    }

    document.getElementById('results').innerText = resultText;
});
