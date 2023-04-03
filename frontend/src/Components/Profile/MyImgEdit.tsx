import React, { useState, ChangeEvent, useRef } from 'react';
import axios from 'axios';
import basicimg from '../../assets/img/basicimg.png';
import addImage from '../../assets/img/addImage.png';
import { Image, ProfileImage, ButtonBackground, ButtonImage } from '../../styles/Profile/MyImgstyle';

function MyEditImg() {
	const [myImage, setMyImage] = useState(`${basicimg}`);
	const imageInput = useRef<HTMLInputElement>(null);
	const getImage = axios.get('').then((res) => {
		// console.log(getImage);
		// // res 형태에 따라 뒤에 null 값이 달라질 수 있음
		// if (res === null) {
		// 	setMyImage(basicimg);
		// } else {
		// 	// res 형태에 따라 뒤에 값이 달라질 수 있음
		// 	setMyImage(res.data.image);
		// }
	});

	const onChange = async (e: any) => {
		e.preventDefault();
		if (e.target.files[0]) {
			setMyImage(e.target.files[0]);
		}
		const reader = new FileReader();
		reader.onload = () => {
			if (reader.readyState === 2) {
				setMyImage(reader.result as string);
			}
		};
		reader.readAsDataURL(e.target.files[0]);
		try {
			const formData = new FormData();
			formData.append('pictures', myImage);
			const response = await axios.post('', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
					// Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
				},
			});
			console.log(response);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<div className="grid grid-cols-8 gap-1">
				<div className="col-start-3 col-end-7">
					<ProfileImage>
						<Image
							src={myImage}
							alt="my-image"
							onClick={() => {
								imageInput.current?.click();
							}}
						/>
						<ButtonImage src={addImage} />
					</ProfileImage>
					<input
						type="file"
						id="profile-upload"
						accept="image/jpg,impge/png,image/jpeg"
						onChange={onChange}
						ref={imageInput}
						style={{ display: 'none' }}
					/>
				</div>
			</div>
		</>
	);
}

export default MyEditImg;
