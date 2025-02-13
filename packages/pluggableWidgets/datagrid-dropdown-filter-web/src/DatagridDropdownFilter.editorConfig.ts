import { DatagridDropdownFilterPreviewProps } from "../typings/DatagridDropdownFilterProps";
import {
    chevronDownIcon,
    ContainerProps,
    hidePropertiesIn,
    hidePropertyIn,
    ImageProps,
    Properties,
    StructurePreviewProps,
    TextProps
} from "@mendix/piw-utils-internal";

export function getProperties(
    values: DatagridDropdownFilterPreviewProps,
    defaultProperties: Properties,
    platform: "web" | "desktop"
): Properties {
    if (values.auto) {
        hidePropertyIn(defaultProperties, values, "filterOptions");
    }
    if (platform === "web") {
        if (!values.advanced) {
            hidePropertiesIn(defaultProperties, values, ["onChange", "valueAttribute"]);
        }
    } else {
        hidePropertyIn(defaultProperties, values, "advanced");
    }
    return defaultProperties;
}

export const getPreview = (values: DatagridDropdownFilterPreviewProps): StructurePreviewProps => {
    return {
        type: "RowLayout",
        borders: true,
        borderRadius: 5,
        borderWidth: 1,
        columnSize: "grow",
        children: [
            {
                type: "RowLayout",
                columnSize: "grow",
                backgroundColor: "#FFFFFF",
                children: [
                    {
                        type: "Container",
                        padding: 8,
                        children: [
                            {
                                type: "Text",
                                fontColor: values.emptyOptionCaption ? "#BBBBBB" : "#FFF",
                                italic: true,
                                content: values.emptyOptionCaption ? values.emptyOptionCaption : "Sample"
                            } as TextProps
                        ],
                        grow: 1
                    } as ContainerProps,
                    {
                        type: "Container",
                        padding: 2,
                        grow: 0,
                        children: [
                            {
                                type: "Image",
                                document: chevronDownIcon
                            } as ImageProps
                        ]
                    } as ContainerProps
                ]
            }
        ]
    };
};
