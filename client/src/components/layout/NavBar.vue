<template>
  <div class="first-section">
    <nav>
      <ul class="first-section-nav-lists">
        <li class="first-section-nav-list">
          <a href="#">Technology</a>
        </li>
        <li class="first-section-nav-list">
          <a href="#">Gaming</a>
        </li>
        <li class="first-section-nav-list">
          <a href="#">Entertainment</a>
        </li>
        <li class="first-section-nav-list">
          <a href="#">Products</a>
        </li>
        <li class="first-section-nav-list">
          <a href="#">Others</a>
        </li>
      </ul>
      <div class="post hvr-sweep-to-right">
        <p><router-link to="/write-blog">Post</router-link></p>
      </div>
    </nav>
    <div class="purple-div"></div>
    <h2 class="first-section-popular">Popular Now</h2>
  </div>
</template>

<style scoped>
.first-section {
  background-color: #2b282c;
  height: 360px;
}
nav {
  display: flex;
  align-items: center;
  justify-content: center;
}
.first-section-nav-lists {
  margin: 0;
  display: flex;
  justify-content: center;
}
.first-section-nav-list {
  list-style: none;
  padding: 18px 23px;
}
.first-section a {
  text-decoration: none;
  color: #ffffffc7;
  font-size: 17px;
}
.first-section a:hover {
  color: white;
  /* text-decoration: underline solid white 1px; */
}

.post {
  padding: 1px 10px;
}
.post p {
  color: white;
  font-size: 17px;
  margin: 0;
}
.hvr-sweep-to-right {
  cursor: pointer;
  display: inline-block;
  vertical-align: middle;
  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);
  position: relative;
  -webkit-transition-property: color;
  transition-property: color;
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
}
.hvr-sweep-to-right:before {
  content: '';
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #746657;
  -webkit-transform: scaleX(0);
  transform: scaleX(0);
  -webkit-transform-origin: 0 50%;
  transform-origin: 0 50%;
  -webkit-transition-property: transform;
  transition-property: transform;
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -webkit-transition-timing-function: ease-out;
  transition-timing-function: ease-out;
}
.hvr-sweep-to-right:hover,
.hvr-sweep-to-right:focus,
.hvr-sweep-to-right:active {
  color: white;
}
.hvr-sweep-to-right:hover:before,
.hvr-sweep-to-right:focus:before,
.hvr-sweep-to-right:active:before {
  -webkit-transform: scaleX(1);
  transform: scaleX(1);
}
.purple-div {
  position: relative;
  /* margin-top: 2px; */
  width: 38px;
  top: 81px;
  left: 66px;
  height: 2px;
  background-color: #db70ff;
  margin-left: 50px;
  border-radius: 20px;
}
.first-section-popular {
  color: white;
  width: 150px;
  position: relative;
  font-weight: 500;
  top: 85px;
  left: 115px;
}
</style>
