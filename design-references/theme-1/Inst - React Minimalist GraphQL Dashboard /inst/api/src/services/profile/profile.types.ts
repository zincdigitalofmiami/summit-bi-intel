import { Field, ID, ObjectType } from 'type-graphql';
import { User } from '../user.types';

@ObjectType()
export class Profile {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  bio?: string;

  @Field()
  role: string;

  @Field({ nullable: true })
  avatar?: string;

  @Field(() => [Post], { nullable: true })
  posts?: Post[];

  @Field(() => [User], { nullable: true })
  followers?: User[];

  @Field(() => [User], { nullable: true })
  following?: User[];

  @Field()
  createdAt: Date;
}

@ObjectType()
export class Image {
  @Field()
  src: string;

  @Field()
  width: number;

  @Field()
  height: number;
}
@ObjectType()
export class ImageGallery {
  @Field(() => ID)
  id: number;

  @Field()
  src: string;

  @Field()
  width: number;

  @Field()
  height: number;
}

@ObjectType()
export class Post {
  @Field(() => ID)
  id: number;

  @Field()
  type: string;

  @Field(() => Image, { nullable: true })
  image?: Image;

  @Field({ nullable: true })
  video?: string;

  @Field(() => [ImageGallery], { nullable: true })
  gallery?: ImageGallery[];

  @Field({ nullable: true })
  numberOflike?: string;

  @Field({ nullable: true })
  numberOfcomment?: string;

  @Field(() => [Comment], { nullable: true })
  comments: Comment[];

  @Field({ nullable: true })
  createdAt: Date;
}
@ObjectType()
export class Comment {
  @Field(() => ID)
  id: number;

  @Field()
  role: string;

  @Field({ nullable: true })
  avatar?: string;

  @Field()
  username: string;

  @Field()
  comment: string;

  @Field({ nullable: true })
  createdAt: Date;
}
