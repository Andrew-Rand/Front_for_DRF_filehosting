module.exports={
   BaseUserUrl:'http://64.227.117.166:1337/api/accounts/',
   BaseFileUrl: 'http://64.227.117.166:1338/api/files/',

   ChunkSize: 50 * 1024 * 1024,
   SmallFileLimit: 128 * 1024 * 1024,

   HashFirstSlice: 100 * 1024 * 1024,
   HashSecondSlice: -2 * 1024 * 1024,
}