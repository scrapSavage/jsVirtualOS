let filesystem={}

class folder {
    constructor(name,content) {
        this.name = name;
        this.content = content;
        this.type = "folder";
    }
}
class file {
    constructor(name,content) {
        this.name = name;
        this.content = content;
        this.type = "file";
    }
}

function init_filesystem() {
    filesystem={
          files:{},
        create_file:(path, content) => {
            localStorage.setItem(path,content)
        },
        get_file_content:(path) => {
            return localStorage.getItem(path)
        },
        write_to_file:(path,new_content) => {
            localStorage.setItem(path,new_content)
        },
        get_all_files:() => {
            return { ...localStorage };
        },
        delete_file:(path) => {
            localStorage.removeItem(path)
        },
      construct_filesystem:() => {
        const root = new folder("~",[])
        let all_files = filesystem.get_all_files()
        let file_count = Object.keys(all_files).length
        for (let key in all_files) {
            let filename = key
            let current_directory = root
            let parent_directories = key.split("/")
            if (parent_directories.length !=1) {
                filename = parent_directories[parent_directories.length-1]
            }
            parent_directories.pop()
            for (let i=0; i<parent_directories.length;++i) {
            
                let exists = false
                let existing
                current_directory.content.forEach((item) => {
                    if (item.name == parent_directories[i] && item.type == "folder") {
                        exists = true
                        existing = item
                        return
                    }
                })
                if (!exists) {
                current_directory.content[current_directory.content.length]=new folder(parent_directories[i],[])
                current_directory = current_directory.content[current_directory.content.length-1]
                } else {
                current_directory = existing
                }
            }
            current_directory.content[current_directory.content.length] = new file(filename,filesystem.get_file_content(key))
        }
        filesystem.files = root
      },
    }
    filesystem.construct_filesystem()
    console.log(filesystem.files)
    init()
}