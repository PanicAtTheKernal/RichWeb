function main() {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response) => response.json())
        .then((json) => {
            const postsWithSixWords = json.filter((post) => {
                const titleLength = post['title'].split(' ');
                return titleLength.length > 6;
            });
            console.log(postsWithSixWords);
        });
}

main();