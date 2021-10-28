import { createElement, ReactNode, FunctionComponent, useState, useEffect, useCallback } from "react";
import { LayoutChangeEvent, View } from "react-native";
import { ResizeModeEnum } from "../../typings/ImageProps";
import { CustomImageObjectProps, onLayoutSetDimensions } from "../utils/imageUtils";
import { DimensionsType, ImageIconSVG } from "./ImageIconSVG";

export interface BackgroundImageProps {
    name?: string;
    source: CustomImageObjectProps;
    customWidth?: number;
    customHeight?: number;
    initialDimensions?: DimensionsType;
    children: ReactNode;
    resizeMode: ResizeModeEnum;
    opacity: number;
    styles: any; // FIXME: fix
}

export const BackgroundImage: FunctionComponent<BackgroundImageProps> = props => {
    const [dimensions, setDimensions] = useState<DimensionsType>();
    const { source, initialDimensions, customWidth, customHeight, children, styles, name } = props;

    useEffect(() => {
        if (customWidth || customHeight) {
            setDimensions(dimensions => ({
                width: customWidth ?? dimensions?.width,
                height: customHeight ?? dimensions?.height
            }));
        }
    }, [customWidth, customHeight]);

    const onLayoutSetDimensionsCallback = useCallback(
        ({ nativeEvent: { layout } }: LayoutChangeEvent) =>
            onLayoutSetDimensions(layout.width, layout.height, setDimensions, initialDimensions),
        [initialDimensions]
    );

    return (
        <View
            onLayout={!dimensions?.width || !dimensions?.height ? onLayoutSetDimensionsCallback : undefined}
            style={styles.container}
        >
            <View
                style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: props.opacity ?? 1
                }}
            >
                <ImageIconSVG
                    {...source}
                    name={name}
                    dimensions={dimensions}
                    initialDimensions={initialDimensions}
                    resizeMode={props.resizeMode}
                    styles={styles.image}
                />
            </View>
            {children}
        </View>
    );
};
