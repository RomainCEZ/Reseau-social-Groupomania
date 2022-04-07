import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CommentModel } from "../../../Database/sequelizeModels/Comment.model";
import { Comment } from "../entities/comment.entity";
import ICommentsRepository from "../interfaces/CommentsRepository";

@Injectable()
export default class CommentsDBAdapter implements ICommentsRepository {
    constructor(
        // @Inject('COMMENT_REPOSITORY') private readonly commentModel: typeof CommentModel,
        @InjectModel(CommentModel) private readonly commentModel: typeof CommentModel,
    ) { }

    async saveComment(postId: string, comment: Comment) {
        await this.commentModel.create<CommentModel>({
            commentId: comment.id,
            content: comment.content,
            author: comment.author,
            authorId: comment.authorId,
            timestamp: comment.timestamp,
            postId
        })
    }
    async getPostCommentsByPostId(postId: string): Promise<Comment[]> {
        const postComments = await this.commentModel.findAll({ where: { postId } })
        if (postComments.length === 0) {
            throw new NotFoundException()
        }
        return postComments.map(comment => Comment.create({
            id: comment.commentId,
            content: comment.content,
            author: comment.author,
            authorId: comment.authorId,
            timestamp: +comment.timestamp
        })
        )
    }
    deletePostCommentsByPostId(postId: string) {
        throw new Error("Method not implemented.");
    }
}