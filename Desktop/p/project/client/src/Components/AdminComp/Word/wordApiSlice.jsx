import apiSlice from "../../../app/apiSlice";

const wordApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getWords: build.query({
            query: () => ({
                url: '/word'
            }),
            providesTags: ["Words"]
        }),

        getWordsByIdLess: build.query({
            query: (_id) => ({
                url:'/word/lesson/'.concat(_id)
            }),
            providesTags: ["Words"]
        }),

        // }),
        deleteWord: build.mutation({
            query: (_id) => ({
                url: "/word",
                method: "DELETE",
                body: { "_id": _id }
            }),
            invalidatesTags: ['Words']
        }),
        addWord: build.mutation({
            query: (word) => ({
                url: "/word",
                method: "POST",
                body: word
            }),
            invalidatesTags: ['Words']
        }),
        updateWord: build.mutation({
            query: (word) => ({
                url: "/word",
                method: "PUT",
                body: word
                // headers:{"autorization":}
            }),
            invalidatesTags: ['Words']
        }),
    }),
})


// })
export const {
    useAddWordMutation, useDeleteWordMutation,useGetWordsByIdLessQuery, useGetWordsQuery,useUpdateWordMutation} = wordApiSlice