function main() {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response) => response.json())
        .then((json) => {
            const postsWithSixWords = json.filter((post) => {
                const titleLength = post['title'].split(' ');
                return titleLength.length > 6;
            });

            const wordFrequencyMaps = json.reduce((freqMap, post) => {
                // Split spaces and new lines 
                const body = post['body'].split(/\s/);
                body.map((word) => {
                    freqMap[word] = (freqMap[word] !== undefined)? freqMap[word] + 1 : 1;
                });
                return freqMap;
            }, {});
            
            console.log(postsWithSixWords);
            console.log(wordFrequencyMaps);
        });
}

main();