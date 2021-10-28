// import { createElement } from "react";
// import { mount, render } from "enzyme";
// import { Image } from "../../Image";
// import { BackgroundImage, BackgroundImageProps } from "../BackgroundImage";
// import { ImageViewer, ImageViewerProps } from "../ImageComponents";
// import { Text } from "react-native";

// const imageProps: ImageViewerProps | BackgroundImageProps = {
//     source: {
//         type: "staticImage",
//         image: "https://pbs.twimg.com/profile_images/1905729715/llamas_1_.jpg"
//     },
//     initialDimensions: {
//         width: 0,
//         height: 0
//     },
//     children: null,
//     styles: undefined,
//     onClick: () => null,
//     setInitialDimensions: () => null,
//     onClickType: "action"
// };
// const glyphiconProps: ImageViewerProps | BackgroundImageProps = {
//     source: {
//         type: "icon",
//         image: "glyphicon-asterisk"
//     },
//     initialDimensions: {
//         width: 0,
//         height: 0
//     },
//     styles: undefined,
//     onClick: () => null,
//     onClickType: "action"
// };

// describe("Image", () => {
//     it("renders the structure with an image", () => {
//         expect(render(<ImageViewer {...imageProps} />)).toMatchSnapshot();
//     });

//     it("renders the structure with an image and percentage dimensions", () => {
//         expect(render(<ImageViewer {...imageProps} height={100} width={"100%"} />)).toMatchSnapshot();
//     });

//     it("renders the structure with an icon", () => {
//         expect(render(<ImageViewer {...glyphiconProps} />)).toMatchSnapshot();
//     });

//     it("renders the structure as a background image", () => {
//         expect(
//             render(
//                 <BackgroundImage {...imageProps}>
//                     <Text>Background Image</Text>
//                 </BackgroundImage>
//             )
//         ).toMatchSnapshot();
//     });

//     describe("when the onClickType is action", () => {
//         it("calls the onClick when clicking on an image", () => {
//             const onClickMock = jest.fn();
//             const imageRender = mount(<ImageViewer {...imageProps} onClick={onClickMock} onClickType="action" />);

//             const image = imageRender.find("img");
//             expect(image).toHaveLength(1);

//             imageRender.simulate("click");
//             expect(onClickMock).toHaveBeenCalled();
//         });

//         it("calls the onClick when clicking on an icon", () => {
//             const onClickMock = jest.fn();
//             const imageRender = mount(<ImageViewer {...glyphiconProps} onClick={onClickMock} onClickType="action" />);

//             const glyphicon = imageRender.find("span");
//             expect(glyphicon).toHaveLength(1);

//             glyphicon.simulate("click");
//             expect(onClickMock).toHaveBeenCalled();
//         });
//     });

//     describe("when the onClickType is enlarge", () => {
//         it("shows a lightbox when the user clicks on the image", () => {
//             const imageRender = mount(<Image {...imageProps} onClickType="enlarge" />);
//             expect(imageRender.find(Lightbox)).toHaveLength(0);

//             const image = imageRender.find("img");
//             expect(image).toHaveLength(1);

//             image.simulate("click");
//             expect(imageRender.find(Lightbox)).toHaveLength(1);
//         });

//         it("closes the lightbox when the user clicks on the close button after opening it", () => {
//             const imageRender = mount(<Image {...imageProps} onClickType="enlarge" />);

//             const image = imageRender.find("img");
//             expect(image).toHaveLength(1);

//             image.simulate("click");
//             expect(imageRender.find(Lightbox)).toHaveLength(1);

//             const closeButton = imageRender.find("button");
//             expect(closeButton).toHaveLength(1);
//             closeButton.simulate("click");

//             expect(imageRender.find(Lightbox)).toHaveLength(0);
//         });
//     });

//     it("does not trigger on clicks from containers if clicked on the image", () => {
//         const onClickOuterMock = jest.fn();
//         const onClickImageMock = jest.fn();
//         const imageRender = mount(
//             <div onClick={onClickOuterMock}>
//                 <Image {...imageProps} onClickType="action" onClick={onClickImageMock} />
//             </div>
//         );

//         const image = imageRender.find("img");
//         expect(image).toHaveLength(1);

//         image.simulate("click");
//         expect(onClickImageMock).toHaveBeenCalledTimes(1);
//         expect(onClickOuterMock).not.toHaveBeenCalled();
//     });

//     describe("when there is an accessibility alt text", () => {
//         it("is set properly on an image", () => {
//             const imageRender = mount(<Image {...imageProps} altText="this is an awesome image" />);
//             const image = imageRender.find("img");
//             expect(image.prop("alt")).toBe("this is an awesome image");
//         });

//         it("is set properly on a glyphicon", () => {
//             const imageRender = mount(<Image {...glyphiconProps} altText="this is an awesome icon" />);
//             const image = imageRender.find("span");
//             expect(image.prop("aria-label")).toBe("this is an awesome icon");
//             expect(image.prop("role")).toBe("img");
//         });
//     });

//     describe("when there is no accessibility alt text", () => {
//         it("nothing is set on an image", () => {
//             const imageRender = mount(<Image {...imageProps} />);
//             const image = imageRender.find("img");
//             expect(image.prop("alt")).toBe(undefined);
//         });

//         it("nothing is set on a glyphicon", () => {
//             const imageRender = mount(<Image {...glyphiconProps} />);
//             const image = imageRender.find("span");
//             expect(image).not.toHaveProperty("aria-label");
//             expect(image).not.toHaveProperty("role");
//         });
//     });

//     describe("when showing an image as a thumbnail", () => {
//         it("includes the thumb=true URL param in the image", () => {
//             const imageRender = mount(<Image {...imageProps} displayAs="thumbnail" />);
//             const image = imageRender.find("img");
//             expect(image.prop("src")).toContain("thumb=true");
//         });

//         it("does not include the thumb=true URL param in the lightbox image", () => {
//             const imageRender = mount(<Image {...imageProps} displayAs="thumbnail" onClickType="enlarge" />);

//             const image = imageRender.find("img");
//             expect(image.prop("src")).toContain("thumb=true");
//             expect(image).toHaveLength(1);

//             image.simulate("click");

//             const allImages = imageRender.findWhere(
//                 node => node.type() === "img" && node.prop("src").startsWith(imageProps.image)
//             );
//             expect(allImages).toHaveLength(2);

//             expect(allImages.at(0).prop("src")).toContain("thumb=true");
//             expect(allImages.at(1).prop("src")).not.toContain("thumb=true");
//         });
//     });

//     describe("when showing as a background image", () => {
//         it("shows the content", () => {
//             const imageRender = mount(
//                 <Image {...imageProps} renderAsBackground backgroundImageContent={<div>Image content</div>} />
//             );
//             expect(imageRender.text()).toContain("Image content");
//         });

//         it("properly handles on click event if configured by the user", () => {
//             const onClickMock = jest.fn();
//             const imageRender = mount(
//                 <Image
//                     {...imageProps}
//                     renderAsBackground
//                     backgroundImageContent={<div>Image content</div>}
//                     onClick={onClickMock}
//                     onClickType="action"
//                 />
//             );
//             const backgroundImage = imageRender.find(".mx-image-viewer.mx-image-background");
//             expect(backgroundImage).toHaveLength(1);

//             backgroundImage.simulate("click");
//             expect(onClickMock).toHaveBeenCalledTimes(1);
//         });
//     });
// });
