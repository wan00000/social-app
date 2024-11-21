import { useState} from 'react';
import { FlatList, Image, Text, TouchableOpacity, ImageBackground } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { icons } from '../constants';

import { Video, ResizeMode } from 'expo-av';

const zoomIn = {
    0: {
        scale: 0.9
    },
    1: {
        scale: 1.0
    }
}

const zoomOut = {
    0: {
        scale: 1
    },
    1: {
        scale: 0.9
    }
}

const Trendingitem = ({ activeItem, item }) => {
    const [play, setPlay] = useState(false);

    return (
        <Animatable.View
            className="mr-5"
            animation={activeItem === item.$id ? zoomIn : zoomOut}
            duration={500}
        >
            {play ? (
                <Video
                    source={{ uri: item.Video }}
                    className="w-52 h-72 rounded-[35px] mt-3 bg-white/10"
                    resizeMode={ResizeMode.CONTAIN}
                    useNativeControls
                    shouldPlay
                    onPlaybackStatusUpdate={(playbackStatus) => {
                        if (playbackStatus.didJustFinish) {
                            setPlay(false);
                        }
                    }}
                />
            ) : (
                <TouchableOpacity
                    className="relative justify-center items-center"
                    activeOpacity={0.7}
                    onPress={() => setPlay(true)}
                >
                    <ImageBackground
                        source={{ uri: item.thumbnail }} // Correct property access for the thumbnail
                        className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40"
                        resizeMode='cover'
                    />
                    <Image
                        source={icons.play}
                        className="w-12 h-12 absolute"
                        resizeMode='contain'
                    />
                </TouchableOpacity>
            )}
        </Animatable.View>
    );
};

const Trending = ({ posts }) => {
    const [activeItem, setActiveItem] = useState(posts[0]?.$id);

    const viewableItemsChanged = ({ viewableItems }) => {
        if (viewableItems.length > 0) {
            setActiveItem(viewableItems[0].item.$id); // Correct usage to set active item based on post ID
        }
    }

    return (
        <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({item}) => (
            <Trendingitem
            activeItem={activeItem}
            item={item}
            />
        )}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={{
            itemVisiblePercentThreshold: 70
        }}
        contentOffset={{ x: 170 }}
        horizontal
        />
    );
}

export default Trending;
