let filesystem={}

function init_filesystem() {
    filesystem={
        create_file:(path, content) => {
            localStorage.setItem(path,content)
        },
        get_file_content:(path) => {
            return localStorage.getItem(path)
        },
        write_to_file:(path,new_content) => {
            localStorage.path = new_content
        },
        get_all_files:() => {
            return { ...localStorage };
        },
        delete_file:(path) => {
            localStorage.removeItem(path)
        }
    }

    init()
}