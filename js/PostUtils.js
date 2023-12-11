class PostUtils {
    static getUserId() {
        return "localUserId";
    }

    static handleErrors(action, error) {
        console.error(`Post action: ${action} failed, error: `, error);
        alert(`Post wasn't ${action}, please try again later`);
    }

    static showSuccessMessage(action) {
        alert(`Post was successful ${action}`);
    }

    static getUserInput(msg, defaultValue = "") {
        return prompt(msg, defaultValue);
    }

    static appendElements(rootElement, elementArray) {
        elementArray.forEach(element => {
            rootElement.append(element);
        });
    }

    static createButton(text, handler) {
        const element = document.createElement("button");
        element.textContent = text;
        element.onclick = handler;

        return element;
    }

    static async loadPostById (id, rootElement) {
        try {
            const postData = await PostAPI.getPostById(id);
            PostUtils.generatePostPage(postData, rootElement);
        } catch (error) {
            PostUtils.handleErrors("updated", error);
        }
    }

    static generatePostPage(post, rootElement) {
        let postElement = document.createElement("div");
        let titleElement = document.createElement("h1");
        let contentElement = document.createElement("p");
        let returnBtnElement = document.createElement("a");
        const updateBtnElement = PostUtils.createButton("Update", () => PostUtils.updatePostById(post.id, post.title, post.body));

        titleElement.textContent = post.title;
        contentElement.textContent = post.body;

        returnBtnElement.textContent = "Return back";
        returnBtnElement.href = "./index.html";

        PostUtils.appendElements(postElement, [titleElement, contentElement, returnBtnElement, updateBtnElement]);

        rootElement.innerHTML = "";
        rootElement.append(postElement);
    }

    static generatePostCard(post, rootElement) {
        let postCardElement = document.createElement("div");
        let titleElement = document.createElement("h4");
        let contentElement = document.createElement("p");

        const openBtnElement = PostUtils.createButton("See more", () => PostUtils.loadPostById(post.id, rootElement));
        const deleteBtnElement = PostUtils.createButton("X", () => PostUtils.deletePostById(post.id));
        const updateBtnElement = PostUtils.createButton("Update", () => PostUtils.updatePostById(post.id, post.title, post.body));

        titleElement.className = "post-title";
        postCardElement.className = "post-card";

        titleElement.textContent = post.title;
        contentElement.textContent = post.body;

        PostUtils.appendElements(postCardElement, [titleElement, deleteBtnElement,
            contentElement, openBtnElement, updateBtnElement])

        return postCardElement;
    }

    static async updatePostById (id, title, text) {
        const newTitle = PostUtils.getUserInput("Enter new title: ", title);
        const newText = PostUtils.getUserInput("Enter new text: ", text);;

        if (!newTitle || !newText) {
            alert("please provide correct title and content");
            return;
        }

        try {
            const userId = PostUtils.getUserId();
            await PostAPI.updatePostById(id, newTitle, newText, userId);
            PostUtils.showSuccessMessage("updated");
        } catch (error) {
            PostUtils.handleErrors("updated", error);
        }
    }

    static async createPost () {
        const title = PostUtils.getUserInput("Enter blog title");
        const text = PostUtils.getUserInput("Enter blog content");

        if (!title || !text) {
            alert("please provide correct title and content");
            return;
        }

        try {
            const userId = PostUtils.getUserId();
            await PostAPI.createPost(title, text, userId);
            PostUtils.showSuccessMessage("created");
        } catch (error) {
            PostUtils.handleErrors("created", error);
        }
    }

    static async loadAllPosts() {
        let postList = document.getElementById("posts-root");
    
        try {
            let posts = await PostAPI.getAllPosts();
        
            posts.map((post) => {
                let postElement = PostUtils.generatePostCard(post, postList);
                postList.append(postElement);
            });
        } catch (error) {
            PostUtils.handleErrors("loaded", error);
        }
    }

    static async deletePostById(id) {
        try {
            await PostAPI.deletePostById(id);
            PostUtils.showSuccessMessage("deleted");
        } catch (error) {
            PostUtils.handleErrors("deleted", error);
        }
    }
}