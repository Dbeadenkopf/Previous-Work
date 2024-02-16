// in here is where the main component
// is , this is where the random meme generator will work

import React from "react";

interface allMemeImgs {
  box_count: number,
     height: number,
      id: string,
      name: string,
      url: string,
      width: number,
}
// THis is how our company does useState it allows use to do our this.usestate in one line
const MemeGenerator = () => {
  const [topText, setTopText] = React.useState("");
  const [bottomText, setBottomText] = React.useState("");
  const [randomImg, setRandomImage] = React.useState(
    "http://i.imgflip.com/1bij.jpgs"
  );
  const [allMemeImgs, setAllMemeImgs] = React.useState<allMemeImgs[]>([]);

  // new version of component did mount, useEffect, updates values right after component renders
  React.useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      // turn response into json... then...
      .then((response) => response.json())
      // give me the response and extract meme from response.data, and then set state allMemeImgs to memes
      .then((response) => {
        const { memes } = response.data;
        // set allMemeImgs to memes
        setAllMemeImgs(memes);
      });
  }, []);

  const handleChange = (event:React.ChangeEvent<HTMLInputElement>
    ) => {
    event.preventDefault();
    const { name, value } = event.target;
    if (name === "topText") {
      setTopText(value);
    }
    if (name === "bottomText") {
      setBottomText(value);
    }
  };
  
  const handleSubmit = (event: React.FormEvent<EventTarget>) => {
    event.preventDefault();
    const randNum: number = Math.floor(Math.random() * allMemeImgs.length);
    const randMemeImg: string = allMemeImgs[randNum].url;
    setRandomImage(randMemeImg);
  };

  return (
    <div>
      <form className="meme-form" onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          name="topText"
          placeholder="Top Text"
          defaultValue={topText}
          onChange={(e) => handleChange(e)}
        />
        <input
          type="text"
          name="bottomText"
          placeholder="Bottom Text"
          defaultValue={bottomText}
          onChange={(e) => handleChange(e)}
        />
        <button>Gen</button>
      </form>
      <div className="meme">
        <h2 className="top">{topText}</h2>
        <img src={randomImg} alt="" />
        <h2 className="bottom">{bottomText}</h2>
      </div>
    </div>
  );
};

// class MemeGenerator extends Component {
//   constructor() {
//     super();
//     this.state = {
//       topText: "",
//       bottomText: "",
//       randomImg: "http://i.imgflip.com/1bij.jpg",
//       allMemeImgs: [],
//     };
//     // lets bind handleChange to the constructor
//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   handleChange(event) {
//     event.preventDefault();
//     const { name, value } = event.target;
//     this.setState({ [name]: value });
//     // console.log("WORKING!", value);
//   }

//   handleSubmit(event) {
//     event.preventDefault();
//     const randNum = Math.floor(Math.random() * this.state.allMemeImgs.length);
//     const randMemeImg = this.state.allMemeImgs[randNum].url;
//     this.setState({ randomImg: randMemeImg });
//   }

//   componentDidMount() {
//     fetch("https://api.imgflip.com/get_memes")
//       .then((response) => response.json())
//       .then((response) => {
//         const { memes } = response.data;
//         //console.log(memes[0]);
//         this.setState({ allMemeImgs: memes });
//       });
//   }

//   render() {
//     return (
//       <div>
//         <form className="meme-form" onSubmit={this.handleSubmit}>
//           <input
//             type="text"
//             name="topText"
//             placeholder="Top Text"
//             defaultValue={this.state.topText}
//             onChange={(e) => this.handleChange(e)}
//           />
//           <input
//             type="text"
//             name="bottomText"
//             placeholder="Bottom Text"
//             defaultValue={this.state.bottomText}
//             onChange={(e) => this.handleChange(e)}
//           />
//           <button>Gen</button>
//         </form>
//         <div className="meme">
//           <h2 className="top">{this.state.topText}</h2>
//           <img src={this.state.randomImg} alt="" />
//           <h2 className="bottom">{this.state.bottomText}</h2>
//         </div>
//       </div>
//     );
//   }
// }

export default MemeGenerator;
