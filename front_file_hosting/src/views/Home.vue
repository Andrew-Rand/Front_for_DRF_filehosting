<template>
    <div class="container text-center h5">
        <h2 class='text-center wel_shad'>Welcome!</h2>
        <br>
        <p>Before using file storage, please register yourself in <a href="#/register" class='glow'>sign up form</a></p>
        <p>If you are already registered on the service, please login <a href="#/login" class='glow'>here</a> </p>
        <p>After login you can use service for <a href="#/upload" class='glow'>upload</a> and <a href="#/files" class='glow'>store</a> for your files, wherever you are, whatever you do</p><br>
        <p class="h4 wel_shad">Thank you very much indeed for using our service. We are working for your benefit!</p>
    </div>
</template>

<script>


export default {
  name: 'Home',
}
</script>

<style>
.glow {
    color: #fff;
    transition: all 300ms;
    text-shadow: 0 0 10px #0698a5,
                 0 0 30px #0698a5,
                 0 0 80px #0698a5,
                 0 0 120px #0698a5,
                 0 0 200px #0698a5;
}
.wel_shad{
    text-shadow: 2px 4px 3px rgba(0,0,0,0.3)
}
</style>
