# Install

`npm install -g bower-files-size`

# Usage

In the directory of a project with `bower.json` and bower dependencies already installed, do:
```
$ bower-files-size
```

## Example

```bash
$ cd vrockai.github.io/
$ bower-files-size 
name              version  totalSize
----------------  -------  ---------
jquery            2.0.3    242 kB   
jquery.stellar    0.6.2    23.3 kB  
jquery-waypoints  2.0.5    16.8 kB  
jquery.easing     1.3.1    8.1 kB   
normalize-css     2.1.3    7.55 kB  
font-awesome      4.7.0    925 B    
less              1.6.3    0 B      

Total size:  299 kB
```