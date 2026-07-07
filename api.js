async function getEntries() {
    const response = await fetch("http://127.0.0.1:8000/entries");
    return await response.json();
}