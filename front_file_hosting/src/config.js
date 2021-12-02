module.exports={
   BaseUserUrl:'http://127.0.0.1:1337/api/accounts/',
   BaseFileUrl: 'http://127.0.0.1:1338/api/files/',
   FileStorageUrl: 'http://127.0.0.1:1338/media/permanent/',

   ChunkSize: 50 * 1024 * 1024,
   SmallFileLimit: 128 * 1024 * 1024,

   HashFirstSlice: 100 * 1024 * 1024,
   HashSecondSlice: -2 * 1024 * 1024,
}