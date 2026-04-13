import postRepository from "../repositories/post.repository.js"
import {NotFoundError} from "../error/errors.js";

class PostService {

    ifPostExists(post, id){
        if (!post) {
            throw new NotFoundError(`Post with id = ${id} not found`);
        }
        return post;
    }

    async createPost(author, data) {
        const tags = [...new Set(data.tags)];
        return await postRepository.createPost({...data, author, tags});
    }

    async getPostById(id) {
        const post = await postRepository.findPostById(id);
        return this.ifPostExists(post, id);
    }


    async deletePostById(id) {
        const post = await postRepository.deletePost(id);
        return this.ifPostExists(post, id);
    }

    async addLike(id) {
        const post = await postRepository.addLike(id);
        return this.ifPostExists(post, id);
    }

    async getPostsByAuthor(author) {
        return await postRepository.findPostByAuthor(author);
    }

    async addComment(id, commenter, content) {

        const comment = {user: commenter, message: content};
        const post =
            await postRepository.addComment(id, comment);
        return this.ifPostExists(post, id);
        // if (!comment || !comment.trim()) {
        //     const err = new Error('Comment message is required');
        //     err.status = 404;
        //     throw err;
        // }

    }

    async getPostsByTags(tagsString) {
        const tags = tagsString.split(',').map(tag => tag.trim().toLowerCase());
        return await postRepository.findPostsByTags(tags);
    }


    async getPostsByPeriod(dateFrom, dateTo) {
        return await postRepository.findPostsByPeriod(new Date(dateFrom), new Date(dateTo));
    }

    async updatePostById(id, data) {
        // const updateData = { ...data };
        // if (updateData.tags !== undefined) {
        //     updateData.tags = this.normalizeTags(updateData.tags);
        // }
        const post = await postRepository.updatePost(id, data);
        return this.ifPostExists(post, id);
    }
}

export default new PostService();