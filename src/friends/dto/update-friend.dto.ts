import { PartialType } from '@nestjs/mapped-types';
import { AddingToFriendList } from './create-friend.dto';

export class UpdateFriendDto extends PartialType(AddingToFriendList) {}
