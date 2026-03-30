import postRepository from "../repositories/post.repository.js"

class PostService {
    async createPost(author, data) {
        const tags = [...new Set(data.tags)];
        return await postRepository.createPost({author, tags, ...data});
    }

    async getPostsById(id) {

            const post = await postRepository.findPostById();
            if (!post) {
                throw new Error(`Post with id = ${id} not found`);
            }
            return post;

    }


    async deletePostById(id) {
        //TODO get post by id
        throw new Error('Not implemented');
    }

    async addLike(id) {
        //TODO add like to post by id
        throw new Error('Not implemented');
    }

    async getPostByAuthor(author) {
        //TODO get post by author
        throw new Error('Not implemented');
    }

    async addComment(id, commenter, comment) {
        //TODO add comment to post by id
        throw new Error('Not implemented');
    }

    async getPostsByTags(tagsString) {
        //TODO get posts by tags
        throw new Error('Not implemented');
    }

    async getPostsByPeriod(dateFrom, dateTo) {
        //TODO get posts by period
        throw new Error('Not implemented');
    }

    async updatePostById(id, data) {
        //TODO update post by id
        throw new Error('Not implemented');
    }
}

export default PostService;