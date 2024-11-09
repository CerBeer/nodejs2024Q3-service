import { User } from '../user/entities/user.entity';
import { Artist } from '../artist/entities/artist.entity';
import { Album } from '../album/entities/album.entity';
import { Track } from '../track/entities/track.entity';
import { Favorite } from '../favorite/entities/favorite.entity';

export const users: User[] = [];
export const artists: Artist[] = [];
export const albums: Album[] = [];
export const tracks: Track[] = [];
export const favorites: Favorite = {
  artists: [],
  albums: [],
  tracks: [],
};
