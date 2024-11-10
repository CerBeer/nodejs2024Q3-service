import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { v4 } from 'uuid';
import { albums, artists, favorites, tracks } from 'src/memdb/memdb';

@Injectable()
export class ArtistService {
  create(createArtistDto: CreateArtistDto) {
    const { name, grammy } = createArtistDto;
    const newArtist = {
      id: v4(),
      name,
      grammy,
    };

    artists.push(newArtist);

    return newArtist;
  }

  findAll() {
    return artists;
  }

  findOne(id: string) {
    const artist = artists.find((artist) => artist.id === id);
    if (!artist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }
    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const { name, grammy } = updateArtistDto;
    if (!name) {
      throw new HttpException('Name are required', HttpStatus.BAD_REQUEST);
    }
    if (grammy === undefined) {
      throw new HttpException('Grammy are required', HttpStatus.BAD_REQUEST);
    }
    const artist = artists.find((artist) => artist.id === id);
    if (!artist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }

    artist.name = name;
    artist.grammy = grammy;

    return artist;
  }

  remove(id: string) {
    const index = artists.findIndex((artist) => artist.id === id);
    if (index === -1) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }

    artists.splice(index, 1);

    tracks.forEach((track) => {
      if (track.artistId === id) {
        track.artistId = null;
      }
    });

    albums.forEach((album) => {
      if (album.artistId === id) {
        album.artistId = null;
      }
    });

    favorites.artists.forEach((artistId) => {
      if (artistId === id) {
        artistId = null;
      }
    });
  }
}
