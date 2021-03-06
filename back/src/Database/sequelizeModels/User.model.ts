import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { CommentModel } from './Comment.model';
import { PostModel } from './Post.model';

@Table
export class UserModel extends Model {

    @Column({ type: DataType.STRING, unique: true })
    userId: string;

    @Column({ type: DataType.STRING, unique: true })
    email: string;

    @Column({ type: DataType.STRING, unique: true })
    username: string;

    @Column({ type: DataType.STRING })
    password: string;

    @Column({ type: DataType.STRING })
    role: string

    @Column({ type: DataType.STRING })
    profilePicture: string

    @Column({ type: DataType.BIGINT })
    timestamp: number;

    @Column({ type: DataType.ARRAY(DataType.STRING) })
    favorites: string[]

    @Column({ type: DataType.BOOLEAN })
    isActive: boolean

    @HasMany(() => CommentModel, { foreignKey: 'authorId', sourceKey: 'userId', as: 'comments' })
    comments: CommentModel[]

    @HasMany(() => PostModel, { foreignKey: 'authorId', sourceKey: 'userId', as: 'posts' })
    posts: PostModel[]
}