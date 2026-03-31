import postService from '../services/post.service.js';

class PostController {
    async createPost(req, res, next) {
        try {
            const post = await postService.createPost(req.params.author, req.body);
            return res.status(201).json(post);
        } catch (err) {
            return next(err);
        }
    }

    async getPostById(req, res, next) {
        try {
            const post = await postService.getPostById(req.params.id);
            return res.json(post);
        } catch (err) {
            return next(err);
        }
    }

    async deletePost(req, res, next) {
        try {
            const post = await postService.deletePostById(req.params.id);
            return res.json(post);
        } catch (err) {
            return next(err);
        }
    }

    async addLike(req, res, next) {
        try {
            const post = await postService.addLike(req.params.id);
            return res.sendStatus(204);
        } catch (err) {
            return next(err);
        }
    }

    async getPostsByAuthor(req, res, next) {
        return res.json(await postService.getPostsByAuthor(req.params.author))
    }

    async addComment(req, res, next) {
        try {
            const post =
                await postService
                    .addComment(req.params.id, req.params.commenter, req.body.message);
            return res.json(post);
        } catch (err) {
            return next(err);
        }
    }

    async getPostsByTags(req, res, next) {
        let values = req.query.values;
        if (Array.isArray(req.query.values)) {
            values = req.query.values.join(',');
        }
        console.log(values);
        return res.json(await postService.getPostsByTags(values));


    }

    async getPostsByPeriod(req, res, next) {
        const {dateFrom, dateTo} = req.query;
        return res.json(await postService.getPostsByPeriod(dateFrom, dateTo))
    }

    async updatePost(req, res, next) {
        try {
            const post =
                await postService.updatePostById(req.params.id, req.body);
            return res.json(post);
        } catch (err) {
            return next(err);
        }
    }
}

export default new PostController();