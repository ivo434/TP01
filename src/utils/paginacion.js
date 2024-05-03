export class PaginationDto{
    limit;
    offset;
    nextPage;
    total;
}


export class Pagination {

    parseLimit(){
        return !isNaN(parseInt(limit)) ? parseInt(limit) : 15;
    }
    parseOffSet(){
        return !isNaN(parseInt(offset)) ? parseInt(offset) : 0;
    }
    paginarDto(){

    }
}
// const response = {
// collection: events,
// pagination: {
//     limit: parsedLimit ,
//     offset: parsedOffset,
//     nextPage:((parsedOffset + 1) * parsedLimit <= totalCount) ? `${ process.env.BASE_URL} / ${ path } ?limit= ${ parsedLimit } &offset= ${ parsedOffset + 1 }${ ( eventName ) ? `&eventName= ${ eventName } ` : null}${ ( eventCategory ) ? `&eventCategory= ${ eventCategory } ` : null} ${ ( eventDate ) ? `&eventDate= ${ eventDate } ` : null}${ ( eventTag ) ? `&eventTag= ${ eventTag } ` : null} ` : null , 
//     total: totalCount
//     }
// }
