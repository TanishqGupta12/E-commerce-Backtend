class apifeature {
    constructor ( query , querystr ){
        this.query = query,
        this.querystr = querystr
    }
    search() {
        const keyword = this.querystr.keyword
        ?
        {
            NameProducts : {
                $regex: this.querystr.keyword,
                $options : "i",
            },
        } : {};
        this.query = this.query.find({...keyword})

        return this

    }

    filter(){
        const quercopy = {...this.querystr}
        const removerfile = [ "keyword" , "page" , "limit"]

        removerfile.forEach(key=> delete quercopy[key]);

        //  filter price 

        let querystr = JSON.stringify(quercopy)
        querystr = querystr.replace(/\b(gt|gte|lt|lte)\b/g, (key)=> `$${key}`);

        this.query = this.query.find(JSON.parse(querystr))
        return this

    }
    // pagination(){
    //     const resultperpaage = 8;
    //     const currentPage = Number(this.querystr.page  || resultperpaage  )

    //     const skip = resultperpaage * (currentPage)
    //     this.query = this.query.limit(resultperpaage).skip(skip)

    //     return this;
    // }


}

module.exports = apifeature