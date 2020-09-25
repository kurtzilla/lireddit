import { MiddlewareFn } from 'type-graphql';
import { MyContext } from '../types';

export const isAuth: MiddlewareFn<MyContext> = (
  { context },
  next
) => {
  if (!context.req.session.userId) {
    throw new Error('not authenticated');
  }

  return next();
};

// TODO first step is to create roles array on user
// export const isAuthByRole: MiddlewareFn<MyContext> = (
//   { context }, restrictedToRoles: string[],
//   next
// ) => {
//   if (!context.req.session.userId) {
//     throw new Error('not authenticated');
//   }

//   let allowed = restrictedToRoles.filter(role => {

//   });
//   // foreach role in restrictedToRoles
//   //  is role in list of user's roles? yes => allowed = true
//   //

//   if(!allowed) {
//     throw new Error('user does not have permissions to view this resource');
//   }

//   return next();
// };
