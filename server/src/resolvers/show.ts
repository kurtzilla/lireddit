import {
  Arg,
  Int,
  Query,
  Resolver,
  Mutation,
  UseMiddleware,
  Field,
  InputType,
} from 'type-graphql';
import { Show } from '../entities/Show';
import { isAuth } from '../middleware/isAuth';

@InputType()
class ShowInput {
  @Field()
  title: string;
  @Field()
  text: string;
}

@Resolver(Show)
export class ShowResolver {
  @Query(() => Show, { nullable: true })
  show(@Arg('id', () => Int) id: number): Promise<Show | undefined> {
    return Show.findOne(id);
  }

  @Mutation(() => Show)
  @UseMiddleware(isAuth)
  async createShow(@Arg('input') input: ShowInput): Promise<Show> {
    return Show.create({
      ...input,
    }).save();
  }
}
