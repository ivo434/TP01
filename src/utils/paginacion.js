import "dotenv/config";

const BASE_URL = process.env.BASE_URL;

export class PaginationDto {
  constructor(limit, offset, nextPage, collection) {
    this.limit = limit;
    this.offset = offset;
    this.nextPage = nextPage;
    this.collection = collection;
  }
}

export class Pagination {
  constructor() {
    this.limitRegex = /limit=\d+/;
    this.offsetRegex = /offset=\d+/;
  }

  parseLimit(limit) {
    return !isNaN(parseInt(limit)) ? parseInt(limit) : 10; // Modificar para que haya más elementos en una "página"
  }

  parseOffset(offset) {
    return !isNaN(parseInt(offset)) ? parseInt(offset) : 0; // No modificar, ya que esta sería la primera página
  }

  buildPaginationDto(limit, currentOffset, collection, path, basePath) {
    const nextPage =
      limit !== -1 && limit + currentOffset < collection
        ? this.buildNextPage(path, limit, currentOffset, basePath)
        : null;
    return new PaginationDto(limit, currentOffset, nextPage, collection);
  }

  buildNextPage(path, limit, currentOffset, basePath) {
    let url = BASE_URL + basePath + path;
    url = this.limitRegex.test(url)
      ? url.replace(this.limitRegex, `limit=${limit}`)
      : `${url}${url.includes("?") ? "&" : "?"}limit=${limit}`;

    url = this.offsetRegex.test(url)
      ? url.replace(this.offsetRegex, `offset=${currentOffset + limit}`)
      : `${url}${url.includes("?") ? "&" : "?"}offset=${currentOffset + limit}`;

    return url;
  }
}
// const response = {
// collection: events,
// pagination: {
//     limit: parsedLimit ,
//     offset: parsedOffset,
//     nextPage:((parsedOffset + 1) * parsedLimit <= collectionCount) ? `${ process.env.BASE_URL} / ${ path } ?limit= ${ parsedLimit } &offset= ${ parsedOffset + 1 }${ ( eventName ) ? `&eventName= ${ eventName } ` : null}${ ( eventCategory ) ? `&eventCategory= ${ eventCategory } ` : null} ${ ( eventDate ) ? `&eventDate= ${ eventDate } ` : null}${ ( eventTag ) ? `&eventTag= ${ eventTag } ` : null} ` : null , 
//     collection: collectionCount
//     }
// }
