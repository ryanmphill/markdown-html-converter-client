const apiUrl = "http://3.140.130.149"

export const convertToHTML = async (userInputData) => {
    const res = await fetch(`${apiUrl}/markdown-to-html`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify(userInputData)
    });
    return await res.json();
}

export const convertToMarkdown = async (userInputData) => {
    const res = await fetch(`${apiUrl}/html-to-markdown`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify(userInputData)
    });
    return await res.json();
}