import { StatusBar, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        gap: 10,
        backgroundColor: '#E2EAF4'
    },
    text: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#060270'
    },
    rootHome: {
        flex: 1,
        alignItems: 'flex-start',
        padding: 20,
        backgroundColor: '#E8E8E8',
    },
    header: {
        flexDirection: 'row',
        gap: 15,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#7DDA58',
        paddingBottom: 10,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: '#007bff',
    },
    container: {
        flex: 1,
    },
    modal: {
        padding: 20,
        marginHorizontal: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        gap: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    icon: {
        alignItems: 'flex-end',
        flex: 1,
        color: '#007bff',
    },
});
