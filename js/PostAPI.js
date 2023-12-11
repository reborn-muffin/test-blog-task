class PostAPI {
    static BASE_URL = "https://jsonplaceholder.typicode.com/posts";
    static ERROR_MESSAGE = "Invalid status in the response";
    static DEFAULT_HEADERS = {
        "Accept": "application/json",
        "Content-Type": "application/json"
    };

    static async handleResponse(response) {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error(PostAPI.ERROR_MESSAGE);
        }
    }

    static async createPost(title, body, userId) {
        const patchedPost = { title, body, userId };
        const requestOptions = {
            method: 'POST',
            headers: PostAPI.DEFAULT_HEADERS,
            body: JSON.stringify(patchedPost)
        };

        try {
            const response = await fetch(PostAPI.BASE_URL, requestOptions)
            return await PostAPI.handleResponse(response);
        } catch(err) {
            throw err;
        }
    }

    static async updatePostById(id, title, body, userId) {
        const patchedPost = { id, title, body, userId };
        const requestOptions = {
            method: 'PUT',
            headers: PostAPI.DEFAULT_HEADERS,
            body: JSON.stringify(patchedPost)
        };

        try {
            const response = await fetch(`${PostAPI.BASE_URL}/${id}`, requestOptions)
            return await PostAPI.handleResponse(response);
        } catch(err) {
            throw err;
        };
    }

    static async deletePostById(id) {
        try {
            const response = await fetch(`${PostAPI.BASE_URL}/${id}`, { method: 'DELETE' });
            return await PostAPI.handleResponse(response);
        } catch(err) {
            throw err;
        }
    }

    static async getPostById(id) {        
        try {
            const response = await fetch(`${PostAPI.BASE_URL}/${id}`);
            return await PostAPI.handleResponse(response);
        } catch {
            throw err;
        }
    }

    static async getAllPosts() {        
        try {
            const response = await fetch(PostAPI.BASE_URL);
            return await PostAPI.handleResponse(response);
        } catch(err) {
            throw err;
        }
    }
}