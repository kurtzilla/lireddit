import {
  Resolver,
  Query,
  Arg,
  Mutation,
  InputType,
  Field,
  Ctx,
  UseMiddleware,
  Int,
  FieldResolver,
  Root,
  ObjectType,
} from 'type-graphql';
import { MyContext } from '../types';
import { isAuth } from '../middleware/isAuth';
import { getConnection } from 'typeorm';
import { User } from '../entities/User';
import { Show } from '../entities/Show';

@InputType()
class ShowInput {
  @Field()
  dateOfShow: string;
  @Field()
  performers: string;
  @Field()
  text: string;
}

@ObjectType()
class PaginatedShows {
  @Field(() => [Show])
  posts: Show[];
  @Field()
  hasMore: boolean;
}

@Resolver(Show)
export class ShowResolver {
  @FieldResolver(() => String)
  textSnippet(@Root() show: Show) {
    return show.text.slice(0, 50);
  }

  @FieldResolver(() => User)
  creator(@Root() show: Show, @Ctx() { userLoader }: MyContext) {
    return userLoader.load(show.creatorId);
  }

  @Query(() => PaginatedShows)
  async shows(
    @Arg('limit', () => Int) limit: number,
    @Arg('cursor', () => String, { nullable: true })
    cursor: string | null
  ): Promise<PaginatedShows> {
    // 20 -> 21
    const realLimit = Math.min(50, limit);
    const reaLimitPlusOne = realLimit + 1;

    const replacements: any[] = [reaLimitPlusOne];

    if (cursor) {
      replacements.push(new Date(parseInt(cursor)));
    }

    const shows = await getConnection().query(
      `
    select s.*
    from show s
    ${cursor ? `where s."dateOfShow" < $2` : ''}
    order by s."dateOfShow" DESC
    limit $1
    `,
      replacements
    );

    return {
      posts: shows.slice(0, realLimit),
      hasMore: shows.length === reaLimitPlusOne,
    };
  }

  @Query(() => Show, { nullable: true })
  post(@Arg('id', () => Int) id: number): Promise<Show | undefined> {
    return Show.findOne(id);
  }

  @Mutation(() => Show)
  @UseMiddleware(isAuth)
  async createShow(
    @Arg('input') input: ShowInput,
    @Ctx() { req }: MyContext
  ): Promise<Show> {
    return Show.create({
      ...input,
      creatorId: req.session.userId,
    }).save();
  }

  @Mutation(() => Show, { nullable: true })
  @UseMiddleware(isAuth)
  async updateShow(
    @Arg('id', () => Int) id: number,
    @Arg('dateOfShow') dateOfShow: string,
    @Arg('performers') performers: string,
    @Arg('text') text: string,
    @Ctx() { req }: MyContext
  ): Promise<Show | null> {
    const result = await getConnection()
      .createQueryBuilder()
      .update(Show)
      .set({ dateOfShow, performers, text })
      .where('id = :id and "creatorId" = :creatorId', {
        id,
        creatorId: req.session.userId,
      })
      .returning('*')
      .execute();

    return result.raw[0];
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteShow(
    @Arg('id', () => Int) id: number,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    await Show.delete({ id, creatorId: req.session.userId });
    return true;
  }
}
